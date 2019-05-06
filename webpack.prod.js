const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./webpack.common.js');
const options = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        publicPath: '/',//可配置cdn缓存文件地址
        path: path.resolve(__dirname, 'dist_k8s')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader']
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    MiniCssPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'stylus-loader',
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: [
                                path.resolve(__dirname, 'src/common/stylus/variable.styl'),
                                path.resolve(__dirname, 'src/common/stylus/mixin.styl')
                            ],
                            injector: (source, resources) => {
                                const combineAll = type => resources
                                    .filter(({ file }) => file.includes(type))
                                    .map(({ content }) => content)
                                    .join('');

                                return combineAll('variable') + combineAll('mixin') + source;
                            }
                        }
                    }]
            }
        ]

    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
                cache: true,
                parallel: true, // 开启并行压缩，充分利用cpu
                sourceMap: false,
                extractComments: false, // 移除注释
                terserOptions: {
                    compress: {
                        drop_debugger: true,
                        drop_console: true
                    }
                }
            }),
            // 用于优化css文件
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessorOptions: {
                    safe: true,
                    autoprefixer: { disable: true }, //
                    mergeLonghand: false,
                    discardComments: {
                        removeAll: true // 移除注释
                    }
                },
                canPrint: true
            })
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    minSize: 20000,
                    minChunks: 1,
                    chunks: 'initial',
                    priority: 1 // 该配置项是设置处理的优先级，数值越大越优先处理
                },
                common: {
                    test: /[\\/]src[\\/]/,
                    name: 'common',
                    minSize: 20000,
                    minChunks: 2,
                    chunks: 'initial',
                    priority: -1,
                    reuseExistingChunk: true // 这个配置允许我们使用已经存在的代码块
                }
            }
        },
        runtimeChunk: {name: 'runtime'}
    },
    plugins: [
        new CleanWebpackPlugin(['dist_k8s']),//clean dist
        new MiniCssPlugin({
            filename: '[name].css',
            chunkFilename: '[name].[contenthash:8].css'
        }),
        // new OptimizeCssAssetsPlugin(),//compress css file
        // Reduces bundles total size
        new webpack.HashedModuleIdsPlugin(),//only update files which has changed
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.production.html',
            inject: 'body',
            favicon: 'src/favicon.ico',
            chunksSortMode: 'none',
            env:{
                manifest:'/assets/manifest.json?v=0.3.9'
            },
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                minifyJS: true,
                minifyCSS: true
            }
        }),
        new workboxPlugin.InjectManifest({
            swSrc:path.join('src', 'sw-dev.js'),//本地sw模版
            swDest:'sw.js',//生成文件 默认dist目录
            importWorkboxFrom: 'local'//本地加载workbox库，默认是谷歌的地址，需要翻墙的
        }),
    ]
});
module.exports = options;
