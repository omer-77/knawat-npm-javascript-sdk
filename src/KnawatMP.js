import fetch from 'node-fetch';
import qs from 'qs';

class KnawatMP {
  static baseUrl = process.env.KNAWAT_MP_BASE_URL || 'https://mp.knawat.io/api';
  headers = {
    Accept: 'application/json',
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
   * @param {*} param0 {key: string|null, secret: string|null, store: string|null}
   */
  constructor({ key, secret, store } = {}) {
    this.key = key;
    this.secret = secret;
    this.store = store;

    // For backward compatibility
    this.consumerKey = key;
    this.consumerSecret = secret;
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
   * Get the current store credentials
   */
  async setCurrentStoreCredentials() {
    // Return the current key and secret
    if (this.key && this.secret) return;
    if (this.consumerKey && this.consumerSecret) return;

    // Try to get credentials from store url
    if (this.store) {
      const storeEncoded = encodeURIComponent(this.store.toLowerCase());
      const storeDoc = await this.$fetch('GET', `/stores/${storeEncoded}`, {
        auth: 'basic',
        queryParams: { withoutBalance: 1 },
      }).catch(e => {
        throw e;
      });

      this.$store = storeDoc;
      // Store credentials for future use
      this.key = storeDoc.consumer_key;
      this.secret = storeDoc.consumer_secret;
    } else {
      throw new Error('Store URL is missing; Can not get the store credentials.');
    }
  }
  /**
   * Return the current token if exists
   * or create a new one
   */
  async getTokenAuth() {
    if (!this.token) {
      await this.setCurrentStoreCredentials();
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
        consumerKey: this.key || this.consumerKey,
        consumerSecret: this.secret || this.consumerSecret,
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
    }).then(async (res) => {
      const jsonRes = await res.json();
      if (res.ok) {
        return jsonRes;
      }
      throw {
        statusCode: res.status,
        path,
        ...jsonRes,
      };
    });
  }
}

export default KnawatMP;
