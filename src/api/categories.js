export default {
  /**
   * Get all catalog categories
   *
   * @returns
   * @see https://knawat-mp.restlet.io/#operation_get_list_of_categories
   * @memberof MP
   */
  getAlCategories() {
    return this.$fetch('GET', '/catalog/categories');
  },

  /**
   * get invoices list
   * @param {object} args
   */
  getCategories(args = {}) {
    const params = Object.entries(args)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');
    return this.$fetch('GET', `/catalog/categories?${params}`);
  }
};
