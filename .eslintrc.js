module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    node: true,
  },
  plugins: ["@typescript-eslint", "jest", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:jest/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": 2,
    "import/no-cycle": [2, { maxDepth: 1 }],
    "no-unused-vars": "off",
    "no-console": "error",
  },
};
