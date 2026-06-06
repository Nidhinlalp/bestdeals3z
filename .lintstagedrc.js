/** @type {import('lint-staged').Config} */
module.exports = {
  // TypeScript / React files inside src dirs — lint + format
  '{apps,packages}/*/src/**/*.{ts,tsx}': ['prettier --write'],

  // Root config + data files — format only (no eslint — these use CJS)
  '*.{js,mjs,cjs}': ['prettier --write'],
  '*.{json,yaml,yml,md}': ['prettier --write'],

  // Styles — format only
  '*.css': ['prettier --write'],

  // Prisma schema — format
  '*.prisma': ['npx prisma format'],
};
