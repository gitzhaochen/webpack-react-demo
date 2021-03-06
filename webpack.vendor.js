const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        vendor: [
            "axios",
            "antd",
            "dayjs",
            "jquery",
            "react",
            "react-dom",
            "react-router-dom"
        ],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]',
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),//clean dist
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.join(__dirname, 'dist', '[name].manifest.json'),
        }),
    ],
};