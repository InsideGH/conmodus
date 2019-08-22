module.exports = {
    env: {
        browser: true,
        commonjs: true,
        node: true,
        es6: true,
    },
    parser: 'babel-eslint',
    extends: ['eslint:recommended', 'plugin:react/recommended'],
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
    settings: {
        react: {
            version: 'detect',
        },
    },
};
