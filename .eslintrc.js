module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  globals: {
    '_': true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'object-curly-spacing': 'off',
    'vue/no-parsing-error': [
      2,
      {
        'x-invalid-end-tag': false
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
