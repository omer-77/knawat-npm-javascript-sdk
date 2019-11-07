export default {
  /**
   * get shipping fees based on weight and country
   * @param {string} country
   * @param {number} weight
   */
  getShippingRules(country, weight, price) {
    return this.$fetch('GET', `/shipment/rules`, {
      auth: 'basic',
      queryParams: { country, weight, price },
    });
  },

  /**
   * get shipping couriers
   */
  getShippingCouriers() {
    return this.$fetch('GET', '/shipment/couriers', { auth: 'basic' });
  },

  /**
   * get all shipment policies
   */
  getAllShipmentPolicies() {
    return this.$fetch('GET', '/shipment', { auth: 'basic' });
  },
};
