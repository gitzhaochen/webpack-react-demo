const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:8].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
    ,
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src')],
                exclude: file => (
                    /node_modules/.test(file)
                ),
                use: {
                    loader: 'babel-loader?cacheDirectory=true'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|gif|png|jpe?g|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name]-[hash:8]-yuanben.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        //set global variables
        new webpack.ProvidePlugin({
            "window.jQuery": "jquery",
            "$": "jquery",
            "jQuery": "jquery"
        }),
        new CopyWebpackPlugin([
            {from: 'src/assets', to: 'assets'},
            // {from:'src/sw.js'},
        ])


    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '~': path.resolve(__dirname, 'node_modules')
        }
    },
};
