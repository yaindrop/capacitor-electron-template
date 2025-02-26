// @ts-check
import eslint from '@eslint/js'
import { ESLint } from 'eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginReact from 'eslint-plugin-react'
// @ts-expect-error https://github.com/facebook/react/issues/30119
import untypedEslintPluginReactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint, { ConfigArray } from 'typescript-eslint'

const eslintPluginReactHooks = untypedEslintPluginReactHooks as ESLint.Plugin & {
  configs: {
    recommended: {
      rules: Record<string, unknown>
    }
  }
}

const config: ConfigArray = tseslint.config(
  {
    ignores: ['.vscode', 'android', 'electron/dist', 'electron/release', 'ios', 'node_modules', 'www'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['src/**/*'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    files: ['runner/**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['src/**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser },
    },
  },
  {
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
    },
  },
  {
    // type checked rules
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/strict-boolean-expressions': 'warn',
      '@typescript-eslint/switch-exhaustiveness-check': ['warn', { considerDefaultExhaustiveForUnions: true }],
    },
  },
  {
    rules: {
      'prefer-const': 'warn',
      'no-param-reassign': 'warn',
      'no-unused-vars': 'off',
      'require-yield': 'off',
      'no-extra-boolean-cast': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'prettier/prettier': 'warn',

      ...eslintPluginReactHooks.configs.recommended.rules,
      'react-hooks/exhaustive-deps': [
        'warn',
        {
          additionalHooks: '(suspend|useAsyncEff|useTimeoutEff)',
        },
      ],
    },
  },
)

export default config
