import fetch, { Response, RequestInit } from 'node-fetch';
import qs from 'qs';

type AuthType = 'basic' | 'token' | 'none';
type RequestMethod = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH';
type HeadersInit = { [key: string]: string };
interface FetchOptions {
  auth: AuthType;
  queryParams?: object;
  body?: string;
  headers?: HeadersInit;
}
interface MPConfig {
  key: string;
  secret: string;
  token?: string;
}

class KnawatMP {
  consumerKey: string;
  consumerSecret: string;
  token: string | undefined;
  [key: string]: any;

  static baseUrl: string = process.env.MP_BASEURL || 'https://mp.knawat.io/api';
  headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  /**
   * Bind a function to the KnawatMP class object prototype
   */
  static _addToPrototype(fns: Function): void {
    Object.entries(fns).forEach(([fnName, fn]: [string, Function]) => {
      this.prototype[fnName] = fn;
    });
  }

  /**
   * KnawatMP sdk constructor
   */
  constructor({ key, secret, token }: MPConfig) {
    this.consumerKey = key;
    this.consumerSecret = secret;
    this.token = token;
  }

  /**
   * Return basic auth buffer
   */
  getBasicAuth(): string {
    const user = process.env.KNAWAT_USER;
    const pass = process.env.KNAWAT_PASS;
    if (!user || !pass) {
      throw new Error('[KNAWAT MP] can not find a user or password');
    }
    return `${Buffer.from(`${user}:${pass}`).toString('base64')}`;
  }

  /**
   * Return the current token if exists
   * or create a new one
   */
  async getTokenAuth(): Promise<string> {
    if (typeof this.token === 'string') {
      return this.token;
    }
    return await this.refreshToken();
  }

  /**
   * Generates a new access token
   */
  refreshToken(): Promise<string> {
    return this.$fetch<{ channel: { token: string } }>('POST', '/token', {
      auth: 'none',
      body: JSON.stringify({
        consumerKey: this.consumerKey,
        consumerSecret: this.consumerSecret,
      }),
    }).then(({ channel }) => {
      this.token = channel.token;
      return channel.token;
    });
  }

  /**
   * Based on the current request auth type
   * set the Authorization header value
   */
  async setAuthHeaders(authType: AuthType): Promise<void> {
    if (authType === 'basic') {
      this.headers.Authorization = `Basic ${this.getBasicAuth()}`;
      return;
    }
    if (authType === 'token') {
      this.headers.Authorization = `Bearer ${await this.getTokenAuth()}`;
      return;
    }
    if (!authType || authType === 'none') {
      delete this.headers.Authorization;
    }
  }

  /**
   * Fetch data from server
   */
  async $fetch<T>(
    method: RequestMethod,
    path: string,
    options: FetchOptions
  ): Promise<T> {
    await this.setAuthHeaders(options.auth);
    let requestUrl = `${KnawatMP.baseUrl}${path}`;
    if (options.queryParams) {
      requestUrl += `?${qs.stringify(options.queryParams)}`;
    }
    return fetch(requestUrl, {
      method: method,
      headers: this.headers,
      ...options,
    }).then(async (res: Response) => {
      const jsonRes = await res.json();
      if (res.ok) {
        return jsonRes;
      }
      throw {
        statusCode: res.status,
        ...jsonRes,
      };
    });
  }
}

export default KnawatMP;
