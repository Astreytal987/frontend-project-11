module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended' // Если ты используешь React
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      ecmaFeatures: {
          jsx: true
      }
    },
    plugins: [
      'react'  // Если ты используешь React
    ],
    rules: {
      // Здесь можно добавить или переопределить правила ESLint
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'react/prop-types': 'off'
    },
  };