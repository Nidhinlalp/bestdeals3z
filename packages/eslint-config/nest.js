const base = require('./index.js');

/** @type {import('eslint').Linter.Config} */
module.exports = {
  ...base,
  rules: {
    ...base.rules,
    // NestJS commonly uses decorators with class members
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // Allow empty constructor bodies (NestJS injection pattern)
    '@typescript-eslint/no-empty-function': 'off',
  },
};
