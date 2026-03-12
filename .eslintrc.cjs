/* eslint-env node */
module.exports = {
  extends: ["next/core-web-vitals", "next/typescript"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: [
    "@typescript-eslint",
    "unused-imports",
    "simple-import-sort",
    "import",
  ],
  ignorePatterns: [
    "node_modules/",
    "dist/",
    ".next/",
    "public/",
    "postcss.config.mjs",
    "next.config.mjs",
    "pnpm-lock.yaml",
  ],
  root: true,
  rules: {
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "warn",
    "import/no-anonymous-default-export": "off",
    "unused-imports/no-unused-vars": [
      "off",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-object-type": "off",
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/no-unused-vars": ["off", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: { attributes: false },
      },
    ],
    "@typescript-eslint/require-await": "error",
  },
};
