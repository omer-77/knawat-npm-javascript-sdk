module.exports = {
  setupFiles: ['<rootDir>/test/setup.js'],
  collectCoverageFrom: ['src/**/*.js'],
  moduleFileExtensions: ['js'],
  testMatch: ['<rootDir>/test/**/*.js'],
  testPathIgnorePatterns: ['<rootDir>/test/setup.js'],
};
