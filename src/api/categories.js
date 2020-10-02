export default {
  /**
   * Get all catalog categories
   *
   * @returns
   * @memberof MP
   */
  getAllCategories() {
    return this.$fetch('GET', '/catalog/categories', { auth: 'token' });
  },

  /**
   * get invoices list
   * @param {object} queryParams
   */
  getCategories(queryParams) {
    return this.$fetch('GET', '/catalog/categories', {
      auth: 'token',
      queryParams,
    });
  },
};
