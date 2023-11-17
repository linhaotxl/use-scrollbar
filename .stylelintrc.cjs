module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-html/vue',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-prettier',
  ],

  plugins: ['stylelint-order'],

  rules: {
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    // 兼容自定义标签名
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['page', 'recycle-item', 'view', 'text', 'scroll-view'],
      },
    ],
    'max-line-length': null,
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'block-no-empty': true,
    'function-url-quotes': 'never',
    'string-quotes': 'double',
    'unit-case': null,
    'rule-empty-line-before': ['always', { ignore: ['first-nested'] }],
    'color-hex-case': 'lower',
    'color-hex-length': 'long',
    'declaration-block-trailing-semicolon': null,
    'font-family-no-missing-generic-family-keyword': null,
    'block-opening-brace-space-before': 'always',
    'property-no-unknown': null,
    'no-empty-source': null,
    'at-rule-no-unknown': null,
    'declaration-colon-newline-after': null,
    'string-no-newline': null,
    'scss/operator-no-newline-after': null,
    'function-whitespace-after': 'always',
    'scss/operator-no-unspaced': null,
    indentation: [2, { baseIndentLevel: 'auto', ignore: 'inside-parens' }],
    'custom-property-pattern': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'layer',
          'apply',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep'],
      },
    ],
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'font-size',
      'font-family',
      'font-weight',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition',
    ],
  },
}