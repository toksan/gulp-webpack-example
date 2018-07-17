// webpack の設定
// https://webpack.js.org/concepts/configuration/

const path = require('path');

module.exports = {
    watch: false,// true にするとファイル更新時に自動ビルド
    mode: 'production',// 'development',
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'public_html/js/'),
        filename: 'index.js'
    }
};