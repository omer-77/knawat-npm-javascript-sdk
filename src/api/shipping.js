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
  getAllShipmentPolicies(queryParams) {
    return this.$fetch('GET', '/shipment', {
      queryParams,
      auth: 'basic',
    });
  },

  /**
   * create shipment policy
   */
  createShipmentPolicy(body) {
    return this.$fetch('POST', '/shipment', {
      body: JSON.stringify(body),
      auth: 'basic',
    });
  },

  /**
   * Get shipment policy by id
   */
  getShipmentPolicyById(policyId) {
    return this.$fetch('GET', `/shipment/${policyId}`, { auth: 'basic' });
  },

  /**
   * Update shipment policy data
   */
  updateShipmentPolicy(policyId, data) {
    return this.$fetch('PUT', `/shipment/${policyId}`, {
      body: JSON.stringify(data),
      auth: 'basic',
    });
  },
};
