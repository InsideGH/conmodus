const autoprefixer = require('autoprefixer');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const config = require('./src/config');
const webpack = require('webpack');

module.exports = {
    entry: './src/conmodus/client-dev-ssr.js',
    output: {
        filename: '[name].js',
        publicPath: '/dist/',
    },
    devtool: 'eval-source-map',
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            reloadAll: true,
                        },
                    },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer],
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            reloadAll: true,
                        },
                    },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer],
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
    devServer: {
        hot: true,
        port: config.CONMODUS_BUNDLES_PORT,
        host: '0.0.0.0',
        disableHostCheck: true
    },
};
