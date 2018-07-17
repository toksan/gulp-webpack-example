// webpack の設定
// https://webpack.js.org/concepts/configuration/

const path = require('path');

module.exports = {
    mode: 'production',// 'development',
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'public_html/js/'),
        filename: 'index.js'
    }
};