import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist', 'node_modules', 'vite.config.ts']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      reactX.configs.recommended,
      reactDom.configs.recommended,
      reactX.configs['recommended-typescript'],
      eslintPluginPrettierRecommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      semi: 'error',
      indent: ['error', 2],
      quotes: ['error', 'double'],
      'prettier/prettier': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'error',
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-extra-semi': 'error',
      'no-extra-boolean-cast': 'error',
    },
  },
])
