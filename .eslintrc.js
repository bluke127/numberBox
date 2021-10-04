module.exports = {
    root: true,
    env: {
        node: true,
    },

    extends: ['eslint:recommended', 'airbnb', 'plugin:prettier/recommended'],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        'no-console': 'error',
        // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        // "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                semi: false,
                useTabs: false,
                tabWidth: 4,
                trailingComma: 'all',
                printWidth: 80,
                bracketSpacing: true,
                arrowParens: 'avoid',
            },
        ],
        indent: ['error', 4],;;;;;;;
        semi: ['error', 'always'],
        'no-trailing-spaces': 0,
        'keyword-spacing': 0,
        'no-unused-vars': 1,
        'no-multiple-empty-lines': 0,
        'space-before-function-paren': 0,
        'eol-last': 0,
    },
}
