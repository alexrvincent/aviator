module.exports = {
  plugins: [
    "stylelint-scss"                 // https://github.com/kristerkari/stylelint-scss#list-of-rules
  ],
  extends: [
    "stylelint-config-standard",     // https://github.com/stylelint/stylelint-config-standard
    "stylelint-prettier/recommended" // https://github.com/prettier/stylelint-prettier#recommended-configuration
  ],
  rules: {
    "at-rule-no-unknown": null,      // https://github.com/kristerkari/stylelint-scss#installation-and-usage
    "scss/at-rule-no-unknown": true, // https://github.com/kristerkari/stylelint-scss#installation-and-usage
  }
}