module.exports = {
  root: true,

  env: {
    node: true,
    browser: false,
  },

  globals: {
    defineModel: true,
    JSX: true,
    ScrollToOptions: true
  },

  overrides: [
    {
      files: [
        'vite.config.ts',
        'unocss.config.ts',
        'postcss.config.ts',
        'shims.d.ts',
        'scripts/*.ts',
      ],
      env: {
        node: true,
        browser: false,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
        'no-undef': 'error',
      },
    },

    {
      files: ['src/**/*.{js,jsx,ts,tsx,vue}', 'core/**/*.{js,jsx,ts,tsx,vue}'],
      env: {
        node: false,
        browser: true,
        'vue/setup-compiler-macros': true,
      },

      extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:vue/vue3-essential',
        '@vue/eslint-config-typescript',
        './.eslintrc-auto-import.json',
      ],
      plugins: ['vue', '@typescript-eslint', 'import'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
      },
      rules: {
        'no-undef': 'error',
        'vue/multi-word-component-names': 'off',
        'vue/require-default-prop': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '_' }]
      },
    },
  ],

  rules: {
    'no-unused-vars': 'off',
    'prefer-arrow-callback': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-types': ['off', { types: { '{}': false } }],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { disallowTypeAnnotations: false },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'sibling',
          'parent',
          'index',
          'unknown',
          'object',
          'type',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
}
