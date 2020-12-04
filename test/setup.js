import KnawatMP from '../src/index.js';

KnawatMP.baseUrl = 'https://dev.mp.knawat.io/api';
const instance = {
  key: '6df6d032-169b-4174-a02e-d943a2557419',
  secret: 'dd8deab0-6dbe-11e9-9f00-035f917f36f6',
  autoLimit: { bucketSize: 2, interval: 1000, limit: 1 },
};
const mp = new KnawatMP(instance);
export default mp;
