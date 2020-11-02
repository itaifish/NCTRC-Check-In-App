// module.exports = {
//   preset: 'react-native',
//   transform: {
//     '^.+\\.tsx?$': 'babel-jest',
//   },
// };

module.exports = {
  //testRegex: "/*.test.tsx$",
 collectCoverage: true,
 coverageThreshold: {
  "global": {
  "branches": 0,
  "functions": 0,
  "lines": 0,
  "statements": 0
  }
 },
 reporters: [
  "default",
  ["./node_modules/jest-html-reporter", {
      "pageTitle": "Test Report"
  }]
],
 moduleDirectories: ["node_modules", "src"],
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