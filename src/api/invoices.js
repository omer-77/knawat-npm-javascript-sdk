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
};
