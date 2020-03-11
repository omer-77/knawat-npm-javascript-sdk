export default {
  /**
   * List all coupons
   */
  listCoupons(queryParams) {
    return this.$fetch('GET', '/coupons', {
      auth: 'basic',
      queryParams,
    });
  },

  /**
   * Create a new coupon
   * @param {Object} body coupon
   */
  createCoupon(body) {
    return this.$fetch('POST', '/coupons', {
      body: JSON.stringify(body),
      auth: 'basic',
    });
  },
  /**
   *
   * @param {*} body
   */
  getCoupon(coupon, queryParams) {
    return this.$fetch('GET', `/coupons/${coupon}`, {
      auth: 'basic',
      queryParams,
    });
  },

  /**
   * Update a coupon
   * @param {String} code
   * @param {Object} body
   */
  updateCoupon(code, body) {
    return this.$fetch('PUT', `/coupons/${code}`, {
      body: JSON.stringify(body),
      auth: 'basic',
    });
  },
};
