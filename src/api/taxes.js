export default {
  /**
   * Create a new tax record
   *
   * @param {object} tax
   * @returns Promise<TaxRecord>
   * @memberof MP
   */
  createTaxRecord(tax) {
    return this.$fetch('POST', '/tax', {
      auth: 'basic',
      body: JSON.stringify(tax),
    });
  },

  /**
   * Update a new tax record
   *
   * @param {string} id
   * @param {object} tax
   * @returns Promise<TaxRecord>
   * @memberof MP
   */
  updateTaxRecord(id, tax) {
    return this.$fetch('PUT', `/tax/${id}`, {
      auth: 'basic',
      body: JSON.stringify(tax),
    });
  },

  /**
   * Update a new tax record
   *
   * @param {object} queryParams
   * @returns Array<TaxRecord>
   * @memberof MP
   */
  getTaxRecords(queryParams) {
    return this.$fetch('GET', '/tax', {
      auth: 'basic',
      queryParams,
    });
  },

  /**
   * Update a new tax record
   *
   * @param {object} queryParams
   * @returns Array<TaxRecord>
   * @memberof MP
   */
  getTaxById(id) {
    return this.$fetch('GET', `/tax/${id}`, { auth: 'basic' });
  },

  /**
   * Update a new tax record
   *
   * @param {string} id
   * @returns Promise
   * @memberof MP
   */
  deleteTaxRecord(id) {
    return this.$fetch('DELETE', `/tax/${id}`, { auth: 'basic' });
  },
};
