module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    // "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'semi': [
            'error',
            'always'
        ],
        "object-curly-newline":['error','always'],
        'no-trailing-spaces': 0,
        'keyword-spacing': 0,
        'no-multiple-empty-lines': true,
        'space-before-function-paren': 0,
        'eol-last': 0
    }
}