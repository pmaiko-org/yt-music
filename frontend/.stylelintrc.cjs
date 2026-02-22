module.exports = {
  extends: [
    // https://github.com/ota-meshi/stylelint-config-recommended-vue
    // https://github.com/stylelint/stylelint-config-standard
    // https://github.com/twitter/recess/blob/master/lib/lint/strict-property-order.js
    // https://www.npmjs.com/package/stylelint-config-recommended-scss
    "stylelint-config-standard",
    "stylelint-config-recommended-scss",
    "stylelint-config-recommended-vue",
    "stylelint-config-recess-order"
  ],
  rules: {
    "import-notation": null,
    "color-function-notation": null,
    "alpha-value-notation": null,
    "scss/at-extend-no-missing-placeholder": null,
    "no-empty-source": null,
    "at-rule-no-unknown": null,
    "no-descending-specificity": null,
    "selector-class-pattern": null,
  }
}
