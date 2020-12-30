export default {
  /**
   * list all stores
   * @param {Object} queryParams search query params
   */
  listStores(queryParams) {
    return this.$fetch('GET', `/stores`, {
      queryParams,
      auth: 'basic',
    });
  },

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
    return this.$fetch('PUT', `/stores/${encodeStoreName(store)}`, {
      body: JSON.stringify(data),
      auth: 'basic',
    });
  },

  /**
   * get store by its url
   * @param {string} store store url
   */
  getStoreByURL(store, params) {
    const queryParams = { ...params };
    if (!('withBalance' in queryParams)) {
      queryParams.withBalance = 1;
    }

    return this.$fetch('GET', `/stores/${encodeStoreName(store)}`, {
      auth: 'basic',
      queryParams,
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
    return this.listStores({ filter });
  },

  /**
   * get the current store data
   */
  getCurrentStore() {
    return this.$fetch('GET', '/stores/me', { auth: 'token' });
  },

  /**
   * re Sync store
   *
   * @param {String} store
   * @param {boolean} [force=false] force sync the store
   * @returns store
   */
  syncStore(store, force = false) {
    return this.$fetch(
      'PUT',
      `/stores/${encodeStoreName(store)}/sync${
        force ? `?timestamp=${Math.random()}` : ''
      }`,
      {
        auth: 'basic',
      }
    );
  },
};

/**
 * Return an encode version from the store name
 */
export function encodeStoreName(store) {
  return encodeURIComponent(store.toLowerCase());
}
