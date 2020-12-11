import mp from './setup';
let products = [];

jest.setTimeout(10000);

test('Get Products', () => {
  return mp.getProducts(10, 1, null, null, 0).then((res) => {
    if (res.products) {
      products = res.products;
    }
    expect(res).toBeDefined();
    expect(res.products).toBeDefined();
    expect(res.total).toBeDefined();
  });
});

// If we have basic keys
if (process.env.KNAWAT_PASS) {
  test('Get Product By Sku', () => {
    return mp.getProductBySku(products[2].sku).then((res) => {
      expect(res.sku).toEqual(products[2].sku);
    });
  });
}

test('Import products', () => {
  return mp.addProducts(products).then((res) => {
    expect(res.success).toContain(products[0].sku);
  });
});

test('Update product instance', () => {
  return mp
    .updateProductBySku(products[0].sku, {
      externalId: Math.random().toString().slice(2, 11),
      variations: [
        {
          externalId: Math.random().toString().slice(2, 11),
          sku: 'M3DMGSO22049-PNK',
        },
        {
          externalId: Math.random().toString().slice(2, 11),
          sku: 'M3DMGSO22049-PNK',
        },
      ],
    })
    .then((res) => {
      expect(res.message).toBe('Updated successfully!');
    });
});

test('Bulk update product instance', () => {
  return mp
    .updateBulkProduct({
      productInstances: [
        {
          sku: products[0].sku,
          externalId: products[0].externalId,
          variations: [
            {
              sku: products[0].variations[0].sku,
            },
          ],
        },
      ],
    })
    .then((res) => {
      expect(res.status).toBe('success');
    });
});

test('Categories list', () => {
  return mp.getAllCategories().then((res) => {
    expect(res.count).toBeGreaterThan(0);
  });
});
