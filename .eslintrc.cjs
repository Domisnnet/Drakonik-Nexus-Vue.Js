module.exports = {
    root: true,
    env: { node: true, browser: true, es2021: true },
    extends: [
      'plugin:vue/vue3-recommended',
      'eslint:recommended',
      'plugin:prettier/recommended'
    ],
    parserOptions: { ecmaVersion: 2021, sourceType: 'module' },
    rules: {
      'vue/script-setup-uses-vars': 'error',
      'no-console': 'warn'
    }
}  