import { encodeStoreName } from './stores';

export default {
  /**
   * get shipping couriers
   */
  getStoreLogs(params) {
    const queryParams = { ...params };
    if (queryParams.storeId) {
      queryParams.storeId = encodeStoreName(queryParams.storeId);
    }
    return this.$fetch('GET', '/logs', { auth: 'basic', queryParams });
  },
};
