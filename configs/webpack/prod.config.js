const { merge } = require('webpack-merge');
const { resolve } = require('path');
const rootConfig = require('./root.config');

module.exports = merge(rootConfig, {
    mode: 'production',
    entry: './index.tsx',
    output: {
        filename: 'js/bundle.[contenthash].min.js',
        path: resolve(__dirname, '../../dist'),
        publicPath: '/',
    },
    devtool: 'source-map',
    plugins: [],
});
