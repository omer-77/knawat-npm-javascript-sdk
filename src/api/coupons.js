export default {
  /**
   * List all coupons
   */
  listCoupons() {
    return this.$fetch('GET', '/coupons', { auth: 'basic' });
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
  getCoupon({ membership, coupon }) {
    return this.$fetch('GET', `/coupons/${coupon}`, {
      auth: 'basic',
      queryParams: { membership },
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
