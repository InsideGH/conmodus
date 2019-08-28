module.exports = {
    env: {
        browser: false,
        commonjs: true,
        node: true,
        es6: true,
    },
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 8,
    },
    rules: {
        semi: ['error', 'always'],
        strict: 0,
        'no-console': [
            'off',
            {
                allow: ['warn', 'error'],
            },
        ],
        'no-extra-boolean-cast': 0,
        'no-unused-vars': [
            'off',
            {
                vars: 'all',
                args: 'after-used',
            },
        ],
    },
};
