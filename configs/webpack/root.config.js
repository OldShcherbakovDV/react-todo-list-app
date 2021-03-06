const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    context: resolve(__dirname, '../../src'),
    module: {
        rules: [
            {
                test: /\.style.js$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                parser: 'postcss-js',
                            },
                            execute: true,
                        },
                    },
                ],
            },
            {
                test: [/\.jsx?$/, /\.tsx?$/],
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?hash=sha512&digest=hex&name=img/[contenthash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
                ],
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({ template: 'index.html.ejs' })],
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    performance: {
        hints: false,
    },
};
