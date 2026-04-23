'use strict';

const tseslint = require('typescript-eslint');
const importPlugin = require('eslint-plugin-import');
const prettier = require('eslint-config-prettier');

module.exports = tseslint.config(
    { ignores: ['dist/**'] },
    {
        rules: {
            'no-new': 'off',
        },
    },
    {
        files: ['**/*.ts'],
        extends: [
            ...tseslint.configs.recommended,
            importPlugin.flatConfigs.recommended,
            importPlugin.flatConfigs.typescript,
        ],
        languageOptions: {
            parserOptions: {
                project: 'tsconfig.test.json',
            },
        },
        rules: {
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-misused-promises': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
    prettier,
);
