import querystring from 'querystring';

export default {
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
    return this.$fetch('GET', `/orders/${id}`);
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
    return this.$fetch('DELETE', `/orders/${id}`);
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
      body: JSON.stringify(data),
    });
  },
};
