import fetch from 'node-fetch';
import qs from 'qs';

class KnawatMP {
  static baseUrl = process.env.MP_BASEURL || 'https://mp.knawat.io/api';
  headers = {
    'Content-Type': 'application/json',
  };

  static _addToPrototype(fns) {
    Object.entries(fns).forEach(([fnName, fn]) => (this.prototype[fnName] = fn));
  }

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
   * @param {object} options
   * @memberof Fetch
   */
  async $fetch(method, path, options = {}) {
    await this.setAuthHeaders(options.auth);
    if (options.queryParams) {
      path += `?${qs.stringify(options.queryParams)}`;
    }
    return fetch(`${KnawatMP.baseUrl}${path}`, {
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
