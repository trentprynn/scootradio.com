/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
    printWidth: 120,
    trailingComma: "es5",
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"]
  };
  
  module.exports = config;