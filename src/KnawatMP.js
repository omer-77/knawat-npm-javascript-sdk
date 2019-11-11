import fetch from 'node-fetch';
import qs from 'qs';

class KnawatMP {
  static baseUrl = process.env.MP_BASEURL || 'https://mp.knawat.io/api';
  headers = {
    'Content-Type': 'application/json',
  };

  /**
   * Bind a function to the KnawatMP class object prototype
   * @param {Function} fns
   */
  static _addToPrototype(fns) {
    Object.entries(fns).forEach(([fnName, fn]) => (this.prototype[fnName] = fn));
  }

  /**
   * KnawatMP sdk constructor
   * @param {*} param0 {key: string, secret: string, token: string|null}
   */
  constructor({ key, secret, token } = {}) {
    this.consumerKey = key;
    this.consumerSecret = secret;
    this.token = token;
  }

  /**
   * Return basic auth buffer
   */
  getBasicAuth() {
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
  async getTokenAuth() {
    if (!this.token) {
      await this.refreshToken();
    }
    return this.token;
  }

  /**
   * Generates a new access token
   *
   * @returns
   * @memberof Fetch
   */
  refreshToken() {
    return this.$fetch('POST', '/token', {
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
   * @param {string} authType
   */
  async setAuthHeaders(authType) {
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
   *
   * @param {string} method
   * @param {string} path
   * @param {object} options { queryParams, auth, body, headers }
   * @memberof Fetch
   */
  async $fetch(method, path, options = {}) {
    await this.setAuthHeaders(options.auth);
    let requestUrl = `${KnawatMP.baseUrl}${path}`;
    if (options.queryParams) {
      requestUrl += `?${qs.stringify(options.queryParams)}`;
    }
    return fetch(requestUrl, {
      method: method,
      headers: this.headers,
      ...options,
    }).then(async res => {
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
