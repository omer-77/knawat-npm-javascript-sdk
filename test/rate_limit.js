import mp from './setup';

/**
 * Test Knawat API limit
 */

const executionTimeAr = [];
jest.setTimeout(10000);
test('Stopcock Test API 1st Call', () => {
  return mp.getProducts(10, 1, null, null, 0).then((res) => {
    executionTimeAr.push(new Date());
    expect(res).toBeDefined();
  });
});
test('Stopcock Test API 2nd Call ', () => {
  return mp.getProducts(10, 1, null, null, 0).then((res) => {
    executionTimeAr.push(new Date());
    expect(res).toBeDefined();
  });
});
test('Stopcock Test API 3rd Call', () => {
  return mp.getProducts(10, 1, null, null, 0).then((res) => {
    executionTimeAr.push(new Date());
    expect(res).toBeDefined();
  });
});
test('Stopcock Test API 4th Call', () => {
  return mp.getProducts(10, 1, null, null, 0).then((res) => {
    executionTimeAr.push(new Date());
    let ApiSlot1 = diff_seconds(executionTimeAr[1], executionTimeAr[0]);
    let ApiSlot2 = diff_seconds(executionTimeAr[3], executionTimeAr[2]);
    expect(res).toBeDefined();
    expect(ApiSlot2).not.toEqual(ApiSlot1);
  });
});

function diff_seconds(dt2, dt1) {
  var diff = (new Date(dt2).getTime() - new Date(dt1).getTime()) / 1000;
  return Math.abs(Math.round(diff));
}
