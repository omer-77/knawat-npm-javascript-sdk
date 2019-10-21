export default {
  /**
   * get the current store data
   */
  createStore(store) {
    return this.$fetch('POST', '/stores', {
      body: JSON.stringify(store),
      auth: 'basic',
    });
  },

  /**
   * update store data
   */
  updateStore(store, data) {
    const path = `/stores/${encodeURIComponent(store.toLowerCase())}`;
    return this.$fetch('PUT', path, {
      body: JSON.stringify(data),
      auth: 'basic',
    });
  },

  /**
   * get the current store data
   */
  getStoresByUser(user, limit = 100) {
    const filter = JSON.stringify({
      where: {
        'users.email': user.toLowerCase(),
      },
      limit,
    });
    return this.$fetch('GET', `/stores?filter=${filter}`, { auth: 'basic' });
  },

  /**
   * get store by its url
   * @param {string} store store url
   */
  getStoreByURL(store) {
    const path = `/stores/${encodeURIComponent(store)}`;
    return this.$fetch('GET', path, { auth: 'basic' });
  },

  /**
   * get the current store data
   */
  getCurrentStore() {
    return this.$fetch('GET', '/stores/me', { auth: 'basic' });
  },

  /**
   * get shipping couriers
   */
  getStoreLogs(params) {
    const searchParams = Object.entries(params).reduce((acc, [key, val]) => {
      if (!val) {
        return acc;
      }
      return (acc += `${key}=${encodeURIComponent(val)}&`);
    }, '?');
    return this.$fetch('GET', `/logs${searchParams}`, { auth: 'basic' });
  },

  /**
   * re Sync store
   */
  syncStore(store) {
    return this.$fetch('PUT', `/stores/${encodeURIComponent(store)}/sync`, {
      auth: 'basic',
    });
  },
};
