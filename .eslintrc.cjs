require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-airbnb-with-typescript',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  env: {
    node: true,
    es2022: true
  },
  rules: {
    'no-console': 'error',
    'no-param-reassign': 'off',
    'array-callback-return': 'warn',
    'import/no-cycle': 'warn',
    'global-require': 'off',
    'no-nested-ternary': 'off',
    'consistent-return': 'warn',
    'no-restricted-globals': 'warn',
    'prefer-destructuring': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-expressions': 'warn',
    '@typescript-eslint/no-use-before-define': 'warn',
    '@typescript-eslint/no-shadow': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/html-button-has-type': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
    'vuejs-accessibility/mouse-events-have-key-events': 'off',
    'vuejs-accessibility/anchor-has-content': 'off',
    'vuejs-accessibility/alt-text': 'warn',
    'vue/no-reserved-component-names': 'off',
    'import/prefer-default-export': 'off'
  },
  overrides: [
    {
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      files: ['./**/*.js', './vite-env.d.ts']
    }
  ]
};
