const base = require('./index.js');

/** @type {import('eslint').Linter.Config} */
module.exports = {
  ...base,
  extends: [...(base.extends ?? []), 'next/core-web-vitals', 'next/typescript'],
  rules: {
    ...base.rules,
    // Next.js specific rules
    '@next/next/no-html-link-for-pages': 'error',
    '@next/next/no-img-element': 'warn',
    // Relax server component rules
    '@typescript-eslint/no-floating-promises': 'error',
  },
  ignorePatterns: [...(base.ignorePatterns ?? []), '.next/**'],
};
