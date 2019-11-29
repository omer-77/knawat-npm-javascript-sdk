export default {
  /**
   * List membership packages
   *
   * @returns
   * @memberof MP
   */
  listMemberships() {
    return this.$fetch('GET', '/membership', { auth: 'basic' });
  },

  /**
   * Get a membership package by id
   * @param {string} id
   * @returns
   * @memberof MP
   */
  getMembershipById(id) {
    return this.$fetch('GET', `/membership/${id}`, { auth: 'basic' });
  },

  /**
   * Create a new membership
   * @param {Object} body membership
   */
  createMembership(body) {
    return this.$fetch('POST', '/membership', {
      body: JSON.stringify(body),
      auth: 'basic',
    });
  },

  /**
   * Update the current membership
   * @param {string} id
   * @param {Object} body membership
   */
  updateMembership(id, body) {
    return this.$fetch('PUT', `/membership/${id}`, {
      body: JSON.stringify(body),
      auth: 'basic',
    });
  },
};
