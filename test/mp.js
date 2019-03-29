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

test('Get Product By Sku', async () => {
  const res = await mp.getProductBySku('J9810A619SPBE394');
  expect(typeof res.product).toBe('object');
  expect(typeof res.product.sku).toBe('string');
  expect(typeof res.product.supplier).toBe('number');
});

test('Total imported products', async () => {
  const res = await mp.getProductsCount();
  expect(typeof res.total).toBe('number');
});

test('Import products', async () => {
  const res = await mp.addProducts([{ sku: 'K4485AZ19SPRD45' }]);
  expect(typeof res).toBe('object');
  expect(typeof res.success[0]).toBe('string');
});

test('Update product instance', async () => {
  const res = await mp.updateProductBySku('M3DMGSO22049-PNK', {
    externalUrl: 'https://devtestknawat.myshopify.com/products/oversize-slit-shoulders-tunic-1',
    externalId: 3081359687744,
    variations: [
      {
        externalId: 26034301468736,
        sku: 'M3DMGSO22049-PNK'
      },
      {
        externalId: 26034301501504,
        sku: 'M3DMGSO22049-PNK'
      }
    ]
  });
  expect(res).toBe('Updated Successfully!');
});

test('Delete product', async () => {
  const res = await mp
    .addProducts([{ sku: 'K5928AZ19SPND1' }])
    .then(() => mp.deleteProductBySku('K5928AZ19SPND1'));
  expect(typeof res).toBe('object');
  expect(res.product.status).toBe('success');
});

test('Categories list', async () => {
  const res = await mp.getCategories();
  expect(typeof res).toBe('object');
  expect(res.length > 0).toBe(true);
  expect(typeof res[0].id).toBe('number');
});

test('Get orders', async () => {
  const res = await mp.getOrders();
  expect(typeof res).toBe('object');
  expect(typeof res[0].id).toBe('string');
  expect(['pending', 'processing', 'cancelled'].includes(res[0].status)).toBe(true);
});

});
