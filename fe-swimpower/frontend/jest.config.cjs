module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\.(css|less|scss)$': 'identity-obj-proxy',
      '\\.(gif|jpg|jpeg|png|svg|webp)$': '<rootDir>/__mocks__/fileMock.js',
      "uuid":require.resolve('uuid'),
    },
  };