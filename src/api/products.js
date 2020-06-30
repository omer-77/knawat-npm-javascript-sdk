export default {
  /**
   * Get all imported products by variation SKU(s)
   *
   * @param {array} skus Array of SKUs
   * @returns
   * @see https://docs.knawat.io/#tag/Products/paths/~1products~1{sku}/get
   * @memberof MP
   */
  getProductsByVariationSku(skus) {
    return this.$fetch('GET', '/products/variation', {
      auth: 'basic',
      queryParams: { skus },
    });
  },

  /**
   * Get product by sku
   *
   * @param {string} sku
   * @returns
   * @see https://docs.knawat.io/#tag/My-Products/paths/~1catalog~1products~1{sku}/get
   * @memberof MP
   */
  getProductBySku(sku, queryParams) {
    return this.$fetch('GET', `/products/${sku}`, {
      auth: 'basic',
      queryParams,
    });
  },
};
