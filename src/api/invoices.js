export default {
  getInvoices() {
    return this.$fetch('GET', '/invoices', { auth: 'token' });
  },

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
};
