export default {
  /**
   * Get currency by code
   * @param {String} code
   */
  getCurrencyByCode(code) {
    return this.$fetch('GET', `/currencies/${code}`, { auth: 'basic' });
  },

  /**
   * @typedef {Object} CurrencyFromTo
   * @property {number} rate The switch rate
   */
  /**
   * Switch currency from a currency to another
   * @param {String} from The base currency to switch from
   * @param {String} to The target currency to switch to
   * @return {CurrencyFromTo}
   */
  switchCurrency(from, to) {
    return this.$fetch('GET', `/currencies/${from}/${to}`, { auth: 'basic' });
  },
};
