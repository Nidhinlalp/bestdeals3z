/** @type {import('lint-staged').Config} */
module.exports = {
  // TypeScript / React files — lint + format
  '*.{ts,tsx}': ['eslint --fix --max-warnings=0', 'prettier --write'],

  // JavaScript files — format only
  '*.{js,jsx,mjs,cjs}': ['prettier --write'],

  // Config / data files — format only
  '*.{json,yaml,yml,md}': ['prettier --write'],

  // Styles — format only
  '*.css': ['prettier --write'],

  // Prisma schema — format
  '*.prisma': ['npx prisma format'],
};
