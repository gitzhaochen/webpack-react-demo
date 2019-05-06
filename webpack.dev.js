const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// const workboxPlugin = require('workbox-webpack-plugin');
const options = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.styl(us)?$/,
                use: ['style-loader', 'css-loader', 'stylus-loader', {
                    loader: 'style-resources-loader',
                    options: {
                        patterns: [
                            path.resolve(__dirname, 'src/common/stylus/variable.styl'),
                            path.resolve(__dirname, 'src/common/stylus/mixin.styl')
                        ],
                        injector: (source, resources) => {
                            const combineAll = type => resources
                                .filter(({file}) => file.includes(type))
                                .map(({content}) => content)
                                .join('');

                            return combineAll('variable') + combineAll('mixin') + source;
                        }
                    }
                }]
            }
        ]
    },
    output: {
        filename: '[name].js',
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        host: '0.0.0.0',
        port: 1116,
        historyApiFallback: true,// pass router to frontend rendor when url-api not found
        hot: true,
        overlay: {
            errors: true
        },
        proxy: {
            '/dev_server_url': {
                target: 'http://10.0.0.18:9613',
                pathRewrite: {"^/dev_server_url": "/v1"},
                changeOrigin: true,//传递给后端正确的Host头 true:target host、 false为localhost
                secure: true //支持 https
            },
            '/server_url': {
                target: 'https://raw.githubusercontent.com',
                pathRewrite: {"^/server_url": ""},
                changeOrigin: true,//传递给后端正确的Host头 true:target host、 false为localhost
                secure: true //支持 https
            },

        }
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/vendor.manifest.json'),
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.development.html',
            chunksSortMode: 'none',
            inject: 'body',
            env: {
                manifest: '/assets/manifest.json?v=0.3.9'
            },
            favicon: 'src/favicon.ico',
            hash: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        // new workboxPlugin.InjectManifest({
        //     swSrc: path.join('src', 'sw-dev.js'),//本地sw模版
        //     swDest: 'sw.js',//生成文件 默认dist目录
        //     importWorkboxFrom: 'local'//本地加载workbox库，默认是谷歌的地址，需要翻墙的
        // })
    ]
});
module.exports = options;
