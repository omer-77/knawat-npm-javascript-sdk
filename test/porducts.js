import mp from './setup';
const products = [{ sku: 'EMT8086EM' }, { sku: 'EMT8107EM' }, { sku: 'J9810A619SPBE394' }];

test('Get Products', () => {
  return mp.getProducts(10, 1, null, null, 0).then(res => {
    expect(res).toBeDefined();
    expect(res.products).toBeDefined();
    expect(res.total).toBeDefined();
    expect(res.products.length).toEqual(10);
  });
});

test('Get Product By Sku', () => {
  return mp.getProductBySku(products[2].sku).then(res => {
    expect(res.product.sku).toEqual(products[2].sku);
  });
});

test('Total imported products', () => {
  return mp.getProductsCount().then(res => {
    expect(res.total).toBeGreaterThanOrEqual(0);
  });
});

test('Import products', () => {
  return mp.addProducts(products).then(res => {
    expect(res.success).toContain(products[0].sku);
  });
});

test('Update product instance', () => {
  return mp
    .updateProductBySku(products[0].sku, {
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
    })
    .then(res => {
      expect(res).toBe('Updated Successfully!');
    });
});

test('Bulk update product instance', () => {
  return mp
    .updateBulkProduct({
      productInstances: [
        {
          sku: 'M3POWNI161002-MUV',
          externalUrl: 'https://test.knawat.io',
          externalId: '22825',
          variations: [
            {
              sku: 'M3POWNI161002-MUV-38',
              externalId: '525827'
            },
            {
              sku: 'M3POWNI161002-MUV-40',
              externalId: '525828'
            }
          ]
        }
      ]
    })
    .then(res => {
      expect(res.status).toBe('success');
    });
});

test('Delete product', () => {
  return mp
    .addProducts(products[0])
    .then(() => mp.deleteProductBySku(products[0].sku))
    .then(res => {
      expect(res.product.sku).toBe(products[0].sku);
      expect(res.product.status).toBe('success');
    });
});

test('Categories list', () => {
  return mp.getCategories().then(res => {
    expect(res.length).toBeGreaterThan(0);
    expect(res[0].id).toBeDefined();
  });
});
