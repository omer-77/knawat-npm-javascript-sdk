import mp from './setup';

/**
 * Test Knawat API limit
 */

const callsToTest = 30;
const bucketSize = 10;
const seconds = (callsToTest - bucketSize) / 2;
jest.setTimeout(callsToTest * 1000);
test(`Throttling ${callsToTest} requests in ${seconds}+ seconds`, async (done) => {
  // call endpoint x times, expect to be finish in x / 2 since we have 2 requests per second
  const startDate = new Date();
  return mp
    .refreshToken()
    .then(() => Promise.all([...Array(callsToTest).keys()].map(() => mp.getProducts())))
    .then(() => {
      expect((new Date() - startDate) / 1000).toBeGreaterThanOrEqual(seconds);
      done();
    });
});
