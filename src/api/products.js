import querystring from 'querystring';

export default {
  /**
   * Get all imported products
   *
   * @param {object} { limit = 10, page = 1, lastUpdate = null, keyword = null, hideOutOfStock = 0 }
   * @returns
   * @see https://knawat-mp.restlet.io/#operation_get_products
   * @memberof MP
   */
  getProducts({
    limit = 10,
    page = 1,
    lastUpdate = null,
    keyword = null,
    hideOutOfStock = 0,
    currency = 'USD'
  } = {}) {
    // Generate url query paramaters
    const params = querystring.stringify({
      limit,
      page,
      lastUpdate,
      keyword,
      hideOutOfStock,
      currency
    });

    return this.$fetch('GET', `/catalog/products?${params}`);
  },

  /**
   * Get product by sku
   *
   * @param {string} sku
   * @returns
   * @see https://knawat-mp.restlet.io/#operation_get_product_by_sku
   * @memberof MP
   */
  getProductBySku(sku) {
    return this.$fetch('GET', `/catalog/products/${sku}`);
  },

  /**
   * Get total number of imported products
   *
   * @returns
   * @see https://knawat-mp.restlet.io/#operation_products_count
   * @memberof MP
   */
  getProductsCount() {
    return this.$fetch('GET', `catalog/products/count`);
  },

  /**
   * Add product(s) to my list
   *
   * @param {array*} products
   * @returns
   * @see https://knawat-mp.restlet.io/#operation_add_to_my_products
   * @memberof MP
   */
  addProducts(products) {
    return this.$fetch('POST', '/catalog/products', {
      body: JSON.stringify({ products })
    });
  },

  /**
   * Update product external IDs by SKU
   *
   * @param {*} data
   * @returns
   * @see https://knawat-mp.restlet.io/#operation_update_product
   * @memberof MP
   */
  updateProductBySku(sku, data) {
    return this.$fetch('PUT', `/catalog/update/${sku}`, {
      body: JSON.stringify({ data })
    });
  },

  /**
   * Bulk product update
   *
   * @param {*} data
   * @returns
   * @see
   * @memberof MP
   */
  updateBulkProduct(data) {
    return this.$fetch('PATCH', `/catalog/products`, {
      body: JSON.stringify(data)
    });
  },

  /**
   * Remove product from my list
   *
   * @returns
   * @see https://knawat-mp.restlet.io/#operation_delete_product_by_sku
   * @memberof MP
   */
  deleteProductBySku(sku) {
    return this.$fetch('DELETE', `/catalog/products/${sku}`);
  }
};
