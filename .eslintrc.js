module.exports = {
    root: true,
    plugins: [
        'eslint-plugin',
        '@typescript-eslint',
        'import',
        'react',
        'react-hooks',
        'eslint-comments'
    ],
    env: {
        es6: true,
        node: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: false,
        project: './tsconfig.json'
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.vue']
        }
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    rules: {
        'no-restricted-imports': [
            'error',
            {
                patterns: ['@mui/*/*/*']
            }
        ],
        'arrow-parens': ['error', 'as-needed'],
        quotes: ['error', 'single'],
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                args: 'all',
                varsIgnorePattern: '^_',
                argsIgnorePattern: '^_',
                ignoreRestSiblings: true
            }
        ],
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-unsafe-call': 'off'
    }
};
