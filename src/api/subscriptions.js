export default {
  /**
   * List all subscriptions
   */
  listSubscriptions() {
    return this.$fetch('GET', '/subscription', { auth: 'basic' });
  },

  /**
   *
   * @param {*} body
   */
  addSubscription(body) {
    return this.$fetch('POST', '/subscription', {
      body: JSON.stringify(body),
      auth: 'basic',
    });
  },

  /**
   * Update a subscription
   * @param {String} id
   * @param {body} body subscription
   */
  updateSubscription(id, body) {
    return this.$fetch('PUT', `/subscription/${id}`, {
      body: JSON.stringify(body),
      auth: 'basic',
    });
  },
};
