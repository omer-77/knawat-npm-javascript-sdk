const MP = require('../src/index.js');

const instance = {
  consumerKey: 'ffdc11c6-b31c-4f81-8f67-468cf776e096',
  consumerSecret: 'b86820ca-ac8c-4af8-ba86-340d57036de7'
};

test('test refresh token', async () => {
  const mp = new MP(instance);
beforeAll(async () => {
  await mp.refreshToken();
});
test('Refresh token', async () => {
  const data = await mp.refreshToken();
  expect(typeof data).toBe('string');
  expect(mp.options.headers.Authorization.search('undefined')).toBe(-1);
});

test('Get Products', async () => {
  const res = await mp.getProducts(10, 1, null, null, 0);
  expect(typeof res).toBe('object');
  expect(typeof res.products).toBe('object');
  expect(typeof res.total).toBe('number');
});

});
