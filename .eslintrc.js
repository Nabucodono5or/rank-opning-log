module.exports = {
  env: {
      es2021: true,
      node: true,
  },
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
      'no-console': 'off',
      'class-methods-use-this': 'off',
      'import/extensions': [
          'error',
          'ignorePackages',
          {
              js: 'never',
              jsx: 'never',
              ts: 'never',
              tsx: 'never',
          },
      ],
  },
  settings: {
      'import/resolver': {
          node: {
              extensions: ['.js', '.jsx', '.ts', '.tsx'],
              paths: ['.'],
          },
      },
  },
};
