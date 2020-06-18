export default {
  /**
   * Add payment to store
   * @param {string} store
   * @param {object} body
   */
  addPayment(store, body) {
    return this.$fetch('POST', `/payments/${encodeURIComponent(store)}`, {
      auth: 'basic',
      body: JSON.stringify(body),
    });
  },

  /**
   * List all payments
   *
   * @param {*} queryParams
   * @returns
   */
  listPayments(queryParams) {
    return this.$fetch('GET', '/payments', {
      auth: 'token',
      queryParams,
    });
  },
};
