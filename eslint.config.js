import globals from 'globals';
import eslint from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    ignores: [
      '**/dist/**',
      '**/public/**',
      '**/*.config.js',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ...react.configs.flat?.recommended.languageOptions,
      ecmaVersion: 2020,
      globals: { ...globals.browser, ...globals.serviceworker },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      // Type assertion is workaround for incorrect TypeScript
      // types in eslint-plugin-react
      //
      // TODO: Remove when types are fixed in eslint-plugin-react
      // - https://github.com/jsx-eslint/eslint-plugin-react/issues/3838
      react: /** @type {import('eslint').ESLint.Plugin} */ (react),
      'react-hooks': /** @type {import('eslint').ESLint.Plugin} */ (reactHooks),
      'react-refresh': reactRefresh,
      'simple-import-sort': /** @type {import('eslint').ESLint.Plugin} */ (
        simpleImportSort
      ),
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.flat?.recommended.rules,
      ...react.configs.flat?.['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. React & hooks
            ['^react', '^react-router-dom', '^react-i18next'],

            // 2. All other external packages (npm)
            ['^\\w', '^@\\w'],

            // 3. Relative imports
            [
              '^(?!.*\\.module\\.s?css$)\\.',
              '^(?!.*\\.module\\.s?css$)\\.\\./',
            ],

            // 4. Styles
            ['\\.module\\.s?css$'],

            // 5. Assets (images, icons)
            ['^.+\\.(gif|png|svg|jpg|jpeg)$'],

            // 6. Side-effect imports
            ['^\\u0000'],
          ],
        },
      ],

      'simple-import-sort/exports': 'error',
      // Disable import/order to avoid conflicts
      'import/order': ['off', { alphabetize: { order: 'ignore' } }],

      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  eslintConfigPrettier,
);
