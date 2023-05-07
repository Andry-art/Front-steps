module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@react-native-community',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['react', 'react-native', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'arrow-parens': ['warn', 'as-needed'],
    'prettier/prettier': 'warn',
    'no-console': 'warn',
    'no-param-reassign': ['error', { props: false }],
    'require-await': 'error',
    'spaced-comment': ['warn', 'always'],
    'no-unused-expressions': ['warn', { allowShortCircuit: true }],
    'react-native/sort-styles': 'off',
    'jest/no-disabled-tests': 'off',
  },
  ignorePatterns: [
    'coverage/',
    'build/',
    'dist/',
    'node_modules',
    'android/',
    'ios/',
    '__mocks__/',
    '.github/',
  ],
};
