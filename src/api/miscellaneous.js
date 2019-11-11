export default {
  /**
   * Get currency by code
   * @param {String} code
   */
  getCurrencyByCode(code) {
    return this.$fetch('GET', `/currencies/${code}`, { auth: 'basic' });
  },
};
