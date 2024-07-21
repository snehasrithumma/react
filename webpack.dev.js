const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = (env) => {
    return merge(common, {
        mode: 'development',
        devServer: {
            static: {
                directory: path.join(__dirname, 'public'),
            },
            compress: true,
            port: 9000,
            historyApiFallback: true,
        },
    });
}
