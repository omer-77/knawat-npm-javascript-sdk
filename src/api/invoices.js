export default {
  /**
   * Lis all store invoices
   */
  getInvoices(queryParams) {
    return this.$fetch('GET', '/invoices', {
      auth: 'token',
      queryParams,
    });
  },

  /**
   * Apply credits to invoice
   * @param {string} id
   * @param {object} payload
   */
  applyCreditsToInvoice(id, data) {
    return this.$fetch('POST', `/invoices/${id}/credits`, {
      auth: 'token',
      body: JSON.stringify(data),
    });
  },
};
