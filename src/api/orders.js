export default {
  /**
   *  Search in orders
   *
   * @param {Object} queryParams
   * @returns
   * @see https://knawat-mp.restlet.io/#operation_get_order_s_
   * @memberof MP
   */
  getOrders(queryParams) {
    return this.$fetch('GET', '/orders', { auth: 'token', queryParams });
  },

  /**
   * Get order by id
   *
   * @param {string} id
   * @returns
   * @see https://knawat-mp.restlet.io/#operation_order_by_id
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
   * @see https://knawat-mp.restlet.io/#operation_order_by_id
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
   * @see https://knawat-mp.restlet.io/#operation_order_by_id
   * @memberof MP
   */
  payOrder(id) {
    return this.$fetch('PUT', `/orders/${id}`, { auth: 'token' });
  },

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
   * @see https://knawat-mp.restlet.io/#operation_update_order
   * @memberof MP
   */
  updateOrder(orderId, data) {
    return this.$fetch('PUT', `/orders/${orderId}`, {
      auth: 'token',
      body: JSON.stringify(data),
    });
  },
};
