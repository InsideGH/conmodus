const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

module.exports = {
    entry: './src/conmodus/client-dev.js',
    output: {
        publicPath: '/',
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
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: [autoprefixer],
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: [autoprefixer],
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/html/index.html',
        }),
        new webpack.DefinePlugin({
            'process.env.API_ENDPOINT': JSON.stringify(process.env.API_ENDPOINT_CLIENT),
            'process.env.GRAPHQL_ENDPOINT': JSON.stringify(process.env.GRAPHQL_ENDPOINT_CLIENT),
            'process.env.VERSION': JSON.stringify(process.env.VERSION),
        }),
    ],
    devServer: {
        hot: true,
        host: '0.0.0.0',
        port: 80,
        historyApiFallback: true,
        overlay: {
            warnings: true,
            errors: true,
        },
        disableHostCheck: true,
    },
};
