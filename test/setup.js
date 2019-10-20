import MP from '../src/index.js';

MP.baseUrl = 'https://dev.mp.knawat.io/api';
const instance = {
  key: '6df6d032-169b-4174-a02e-d943a2557419',
  secret: 'dd8deab0-6dbe-11e9-9f00-035f917f36f6'
};
const mp = new MP(instance);
export default mp;
