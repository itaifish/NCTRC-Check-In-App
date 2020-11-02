// module.exports = {
//   preset: 'react-native',
//   transform: {
//     '^.+\\.tsx?$': 'babel-jest',
//   },
// };

module.exports = {
  collectCoverage: true,
  coverageDirectory: './build/test/coverage/',
  coverageReporters: ['html', 'json', 'text-summary'],
  collectCoverageFrom: [
    './app/**/*.{ts,tsx,js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/amplify/**',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-navigation|react-navigation-redux-helpers|@react-navigation/.*)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/_utils.ts'],
  setupFiles: [
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
  ],
};