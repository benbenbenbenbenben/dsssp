import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  ...compat.extends(
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'simple-import-sort': simpleImportSort
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        myCustomGlobal: 'readonly'
      }
    },

    settings: {
      'import/resolver': {
        node: {
          paths: ['.'],
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    },

    rules: {
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true
        }
      ],
      'react/no-array-index-key': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'no-shadow': 'off',
      'no-undef': 'error',
      'no-bitwise': 'warn',
      'no-plusplus': 'off',
      'no-redeclare': 'off',
      'no-unused-vars': 'off',
      'no-nested-ternary': 'off',
      'no-restricted-exports': 'off',
      'no-use-before-define': 'error',

      'no-console': [
        'error',
        {
          allow: ['error']
        }
      ],

      'no-param-reassign': [
        'error',
        {
          props: false
        }
      ],

      'global-require': 'off',
      'class-methods-use-this': 'off',
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unused-vars': 'error',

      '@typescript-eslint/no-explicit-any': [
        'warn',
        {
          ignoreRestArgs: true
        }
      ],

      '@typescript-eslint/no-empty-function': 'warn',

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports'
        }
      ],
      yoda: 'off'
    }
  },
  {
    files: [
      '**/*.js',
      '**/*.mjs',
      '**/*.cjs',
      '**/*.jsx',
      '**/*.ts',
      '**/*.tsx'
    ],

    rules: {
      // "simple-import-sort/imports": ["error", {
      //     groups: [
      //         ["^react", "^next", "^(?!.*services)\\w+[^/]*$"],
      //         ["^@", "^@mui", "^assets"],
      //         ["^\\w"],
      //         [
      //             "^services",
      //             "^providers",
      //             "^store",
      //             "@store",
      //             "slices",
      //             "^hooks",
      //             "^utils",
      //             "^configs",
      //             "^constants",
      //         ],
      //         ["font", "styles", "css$"],
      //         ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
      //         ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
      //     ],
      // }],
    }
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],

    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  }
]
