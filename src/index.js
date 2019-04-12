import fetch from 'node-fetch';
import querystring from 'querystring';

/**
 * A Class Library for handling Knawat MarketPlace related Operations.
 *
 * @class MP
 */
class MP {
  static baseUrl = process.env.MP_BASEURL || 'https://mp.knawat.io/api';
  headers = {
    'Content-Type': 'application/json'
  };

  /**
   * Creates an instance of MP.
   *
   * @param {object} activeInstance
   * @memberof MP
   */
  constructor({ key, secret, token }) {
    if (!key || !secret) {
      throw new Error('not a valid consumerKey or consumerSecret');
    }

    this.consumerKey = key;
    this.consumerSecret = secret;
    this.token = token;
  }

  /**
   * Generate access token from store key and secret
   *
   * @readonly
   * @memberof MP
   */
  get token() {
    if (!this.myToken) {
      return this.refreshToken();
    }

    return this.myToken;
  }

  set token(val) {
    if (!val) {
      return;
    }
    this.myToken = val;
    this.headers.Authorization = `Bearer ${val}`;
  }

  /**
   * Generates a new access token
   *
   * @returns
   * @memberof MP
   */
  refreshToken() {
    return this.$fetch('POST', '/token', {
      body: JSON.stringify({
        consumerKey: this.consumerKey,
        consumerSecret: this.consumerSecret
      })
    }).then(({ channel }) => {
      this.token = channel.token;
      return channel.token;
    });
  }

  /**
   * Get all imported products
   *
   * @param {object} { limit = 10, page = 1, lastUpdate = null, keyword = null, hideOutOfStock = 0 }
   * @returns
   * @see https://knawat-mp.restlet.io/#operation_get_products
   * @memberof MP
   */
  getProducts({ limit = 10, page = 1, lastUpdate = null, keyword = null, hideOutOfStock = 0 }) {
    // Generate url query paramaters
    const params = querystring.stringify({ limit, page, lastUpdate, keyword, hideOutOfStock });

    return this.$fetch('GET', `/catalog/products?${params}`);
  }

  /**
   * Get product by sku
   *
   * @param {string} sku
   * @returns
   * @see https://knawat-mp.restlet.io/#operation_get_product_by_sku
   * @memberof MP
   */
  getProductBySku(sku) {
    return this.$fetch('GET', `/catalog/products/${sku}`);
  }

  /**
   * Get total number of imported products
   *
   * @returns
   * @see https://knawat-mp.restlet.io/#operation_products_count
   * @memberof MP
   */
  getProductsCount() {
    return this.$fetch('GET', `catalog/products/count`);
  }

  /**
   * Add product(s) to my list
   *
   * @param {array*} products
   * @returns
   * @see https://knawat-mp.restlet.io/#operation_add_to_my_products
   * @memberof MP
   */
  addProducts(products) {
    return this.$fetch('POST', '/catalog/products', {
      body: JSON.stringify({ products })
    });
  }

  /**
   * Update product external IDs by SKU
   *
   * @param {*} data
   * @returns
   * @see https://knawat-mp.restlet.io/#operation_update_product
   * @memberof MP
   */
  updateProductBySku(sku, data) {
    return this.$fetch('PUT', `/catalog/update/${sku}`, {
      body: JSON.stringify({ data })
    });
  }

  /**
   * Bulk product update
   *
   * @param {*} data
   * @returns
   * @see
   * @memberof MP
   */
  updateBulkProduct(data) {
    return this.$fetch('PATCH', `/catalog/products`, {
      body: JSON.stringify(data)
    });
  }

  /**
   * Remove product from my list
   *
   * @returns
   * @see https://knawat-mp.restlet.io/#operation_delete_product_by_sku
   * @memberof MP
   */
  deleteProductBySku(sku) {
    return this.$fetch('DELETE', `/catalog/products/${sku}`);
  }

  /**
   * Get all catalog categories
   *
   * @returns
   * @see https://knawat-mp.restlet.io/#operation_get_list_of_categories
   * @memberof MP
   */
  getCategories() {
    return this.$fetch('GET', '/catalog/categories');
  }

  /**
   *  Get all current orders
   *
   * @param {number} [limit=25]
   * @param {number} [page=1]
   * @returns
   * @see https://knawat-mp.restlet.io/#operation_get_order_s_
   * @memberof MP
   */
  getOrders(limit = 25, page = 1) {
    const params = querystring.stringify({ limit, page });
    return this.$fetch('GET', `/orders?${params}`);
  }

  /**
   * Get order by id
   *
   * @param {string} id
   * @returns
   * @see https://knawat-mp.restlet.io/#operation_order_by_id
   * @memberof MP
   */
  getOrderById(id) {
    return this.$fetch('GET', `/orders/${id}`);
  }

  /**
   * Cancel order by id
   *
   * @param {string} id
   * @returns
   * @see https://knawat-mp.restlet.io/#operation_order_by_id
   * @memberof MP
   */
  cancelOrder(id) {
    return this.$fetch('DELETE', `/orders/${id}`);
  }

  /**
   * Create new order
   *
   * @param {array} data
   * @returns
   * @see https://knawat-mp.restlet.io/#operation_create_order
   * @memberof MP
   */
  createOrder(data) {
    return this.$fetch('POST', '/orders', {
      body: JSON.stringify(data)
    });
  }

  /**
   * Update current order
   *
   * @param {string} orderId
   * @param {array} data
   * @returns
   * @see https://knawat-mp.restlet.io/#operation_update_order
   * @memberof MP
   */
  updateOrder(orderId, data) {
    return this.$fetch('PUT', `/orders/${orderId}`, {
      body: JSON.stringify(data)
    });
  }

  /**
   * Fetch data from server
   *
   * @param {string} method
   * @param {string} path
   * @param {object} options
   */
  $fetch(method, path, options = {}) {
    return fetch(`${MP.baseUrl}${path}`, {
      method: method,
      headers: this.headers,
      ...options
    })
      .then(res => res.json())
      .catch(error => {
        throw error;
      });
  }
}

module.exports = MP;
