import mp from './setup';
jest.setTimeout(10000);
test('test invalid instance', () => {
  const invalid = () => new MP();
  expect(invalid).toThrow(Error);
});

test('Refresh token', () => {
  return mp.refreshToken().then((data) => {
    expect(data).toBeDefined();
    expect(mp.token).toBeDefined();
  });
});
