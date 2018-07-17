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
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // Babel 6.x なら 'presets': ['env']
                        // Babel 7.x なら 'presets': ['@babel/preset-env']
                        'presets': ['env']// Babel 6.x
                    }
                }
            }
        ]
    }
};