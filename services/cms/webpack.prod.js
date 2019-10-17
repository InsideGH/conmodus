const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssnano = require('cssnano');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/conmodus/client-prod.js',
    output: {
        filename: '[name].js',
        publicPath: '/',
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
        new HtmlWebpackPlugin({
            template: 'src/html/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new webpack.DefinePlugin({
            'process.env.API_ENDPOINT': JSON.stringify(process.env.API_ENDPOINT_CLIENT),
            'process.env.GRAPHQL_ENDPOINT': JSON.stringify(process.env.GRAPHQL_ENDPOINT_CLIENT),
            'process.env.VERSION': JSON.stringify(process.env.VERSION),
        }),
    ],
};
