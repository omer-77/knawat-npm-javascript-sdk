export default {
  /**
   * list all zones
   *
   */
  listZones() {
    return this.$fetch('GET', `/zones`, {
      auth: 'basic',
    });
  },

  /**
   * get zone by id
   */
  getZoneByID(id) {
    return this.$fetch('GET', `/zones/${id}`, {
      auth: 'basic',
    });
  },
  /**
   * get zone by domain
   */
  getZoneByDomain(domain) {
    return this.$fetch('GET', `/zones/domain/${domain}`, {
      auth: 'basic',
    });
  },

  /**
   * update zone data by ID
   */
  updateZoneByID(id, data) {
    return this.$fetch('PUT', `/zones/${id}`, {
      body: JSON.stringify(data),
      auth: 'basic',
    });
  },

  /**
   * Create zone
   */
  createZone(zone) {
    return this.$fetch('POST', `/zones/`, {
      body: JSON.stringify(zone),
      auth: 'basic',
    });
  },
};
