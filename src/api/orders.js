export default {
  /**
   *  Search in orders
   *
   * @param {Object} queryParams
   * @returns
   * @memberof MP
   */
  getOrders(queryParams) {
    return this.$fetch('GET', '/orders', { auth: 'token', queryParams });
  },

  /**
   *
   * @param {*} orderId
   */
  getOrderWarnings(orderId) {
    return this.$fetch('GET', `/orders/${orderId}/warnings`, {
      auth: 'token',
    });
  },

  /**
   * Get order by id
   *
   * @param {string} id
   * @returns
   * @memberof MP
   */
  getOrderById(id) {
    return this.$fetch('GET', `/orders/${id}`, { auth: 'token' });
  },

  /**
   * Cancel order by id
   *
   * @param {string} id
   * @returns
   * @memberof MP
   */
  cancelOrder(id) {
    return this.$fetch('DELETE', `/orders/${id}`, { auth: 'token' });
  },

  /**
   * Cancel order by id
   *
   * @param {string} id
   * @returns
   * @memberof MP
   */
  payOrder(id) {
    return this.$fetch('PUT', `/orders/pay/${id}`, { auth: 'token' });
  },

  /**
   * Create new order
   *
   * @param {array} data
   * @returns
   * @memberof MP
   */
  createOrder(data) {
    return this.$fetch('POST', '/orders', {
      auth: 'token',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update current order
   *
   * @param {string} orderId
   * @param {array} data
   * @returns
   * @memberof MP
   */
  updateOrder(orderId, data) {
    return this.$fetch('PUT', `/orders/${orderId}`, {
      auth: 'token',
      body: JSON.stringify(data),
    });
  },
};
