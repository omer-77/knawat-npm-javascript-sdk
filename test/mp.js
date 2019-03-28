const MP = require('../dist/mp.js');

const instance = {
  consumerKey: 'ffdc11c6-b31c-4f81-8f67-468cf776e096',
  consumerSecret: 'b86820ca-ac8c-4af8-ba86-340d57036de7'
};

test('test 1', async () => {
  const mp = await new MP(instance);
  expect(typeof mp.token).toBe('string');
});
