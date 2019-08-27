const autoprefixer = require('autoprefixer');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const cssnano = require('cssnano');
const webpack = require('webpack');

module.exports = {
    entry: './src/conmodus/client-prod.js',
    output: {
        filename: '[name].js',
        publicPath: '/dist/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'eslint-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer, cssnano],
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer, cssnano],
                        },
                    },
                    { loader: 'sass-loader' },
                ],
            },
        ],
    },
    plugins: [
        new ManifestPlugin(),
        new LoadablePlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new webpack.DefinePlugin({
            'process.env.API_GATEWAY': JSON.stringify(process.env.API_GATEWAY_CLIENT),
        }),
    ],
};
