module.exports = {
  root: true,
  env: {
    es6: true,
    commonjs: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.eslint.json',
  },
  ignorePatterns: ['dist/'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import'],
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint/eslint-plugin'],
      rules: {
        // Overwrites ts rules that conflicts with basic eslint rules

        /**
         * `no-shadow` doesn't support Typescript enums
         * see https://github.com/typescript-eslint/typescript-eslint/issues/2483
         */
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',

        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
      },
    },

    {
      files: ['**/*.spec.{js,ts,tsx}'],
      rules: {
        'tsdoc/syntax': 'off',
      },
    },
  ],
  rules: {
    'no-console': 'warn',
    'no-void': ['error', { allowAsStatement: true }],
    'no-constant-condition': 'off',

    '@typescript-eslint/require-await': 'off',

    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],

    // note you must disable the base rule as it can report incorrect errors
    'no-return-await': 'off',
    '@typescript-eslint/return-await': 'error',

    /**
     * Import eslint rules
     */
    'import/no-cycle': ['error', { ignoreExternal: true }],
    'import/no-useless-path-segments': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-default-export': 'warn',
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
        groups: ['builtin', 'external', 'unknown', ['internal', 'parent', 'sibling', 'index']],
        'newlines-between': 'always',
      },
    ],
    'import/no-duplicates': 'error',
  },
};
