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
   * 
   * @see https://docs.knawat.io/#tag/Invoices/paths/~1invoices~1{id}~1credits/post
   */
  applyCreditsToInvoice(id, data) {
    return this.$fetch('POST', `/invoices/${id}/credits`, {
      auth: 'token',
      body: JSON.stringify(data),
    });
  },
};
