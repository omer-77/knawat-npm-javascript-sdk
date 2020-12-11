import mp from './setup';

/**
 * Test Knawat API limit
 */

const callsToTest = 30;
jest.setTimeout(callsToTest * 1000);
test(`Throttling ${callsToTest} requests in ${
  callsToTest / 2 - 1
}+ seconds`, async (done) => {
  // call endpoint x times, expect to be finish in x / 2 since we have 2 requests per second
  const startDate = new Date();
  return Promise.allSettled(
    [...Array(callsToTest).keys()].map(() => mp.getProducts())
  ).then(() => {
    expect((new Date() - startDate) / 1000).toBeGreaterThanOrEqual(callsToTest / 2 - 3);

    done();
  });
});
