const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
        mode: 'development',
        devServer: {
            static: {
                directory: path.join(__dirname, 'public'),
            },
            compress: true,
            port: 9000,
            historyApiFallback: true,
        },
        plugins: [
            new webpack.DefinePlugin({
              'process.env.NODE_ENV': JSON.stringify('development'),
              '__IS_DEV__': JSON.stringify(true),
            }),
          ],
    });
