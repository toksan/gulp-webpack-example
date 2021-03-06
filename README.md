# gulp-webpack-example


## Node.js のインストール
<https://nodejs.org/ja/>　よりNode.js の推奨板（LTS）をダウンロードしてインストール。  
GUIウィザードにしたがってインストールするだけ。

確認コマンド  
$ node -v  
$ npm -v


## npm 初期化
プロジェクトのあるディレクトリに移動後、初期化処理を実行して package.json を生成。

$ cd YourProjectDirector  
$ npm init -y

※以下のコマンドも cd したプロジェクトのあるディレクトリで実行。


## Gulp と Sass 関連モジュールの導入
Gulp と Sass 関連モジュールをインストールしましょう。  
必須ではないですが gulp-sourcemaps も入れておきましょう。

$ npm install -D gulp gulp-sass gulp-sourcemaps


## Gulp タスク設定
gulpfile.js というファイルを作成して、タスクを書きます。

$ touch gulpfile.js  
$ vi gulpfile.js  #  任意のエディタで編集

たとえば gulpfile.js を以下のように編集・保存すると、  
public_html/sass ディレクトリにある拡張子 .scss を  
public_html/css ディレクトリに .css として書き出します。

<pre>
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    return gulp.src('./public_html/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public_html/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./public_html/scss/**/*.scss', ['sass']);
});
</pre>


## サンプルファイルの作成
Gulpタスクを実行する前に、動作確認のためのサンプルファイル2点を作成しておきましょう。

public_html/index.html  
public_html/scss/style.scss  

※ファイルのソースコードはGithub参照


## Gulp タスクの実行
先程 gulpfile.js に設定したタスク sass を実行します。
コマンド npx gulp タスク名 で実行できます。

$ npx gulp sass  

実行すると public_html/scss/style.scss がコンパイルされて以下の2ファイルが作成されます。

public_html/css/style.css  
public_html/css/style.css.map


## ブラウザで確認
public_html/index.html をブラウザから確認してみましょう。
スタイルが適用されていることがわかります。


## Gulp タスクの自動実行
style.scss を変更するたびに $ npx gulp sass コマンドを実行するのは手間です。  
gulpfile.js に設定した sass:watch により自動化できます。

$ npx gulp sass:watch  

コマンドを実行すると public_html/scss/ にある拡張子 .scss ファイルに何らかの編集（変更）があると、  
自動的に $ npx gulp sass が実行され、 .css と .css.map ファイルが作成されるようになります。


## webpack の導入
2018年時点の最新版 webpack v4 以降では webpack-cli をインストールする必要があります。

$ npm install -D webpack webpack-cli


## webpack の設定
webpack.config.js という名前のファイルを設置

<pre>
const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'public_html/js/'),
        filename: 'index.js'
    }
};
</pre>

エントリポイント ./src/js/index.js を ./public/html/js/index.js にバンドル


## サンプルファイルの作成
src/js/modules/alert_name.js  
src/js/index.js  
public_html/index.html


## webpack によるビルド
webpack.config.js の設定、エントリやモジュールの作成が完了したら、下記コマンドでビルド。

$ npx webpack

これによりエントリポイント（このサンプルでは ./src/js/index.js ）をもとに関連するJSモジュール等を一つにまとめて（バンドルして）、output で指定したパスにJSファイルが書き出されます。


## サンプル確認
public_html/index.html  をブラウザで開いてみましょう。
My Name is John. とアラートが表示され、コンソールには 12  6  8  が出力されることを確認しましょう。



## Gulp から webpack を使う方法（応用）
gulp から webpack を使うには webpack-stream モジュールをインストールする必要あり。

$ npm install -D webpack-stream  
$ vi gulpfile.js

<pre>
const webpack = require('webpack-stream');
gulp.task('webpack', function () {
    return gulp.src('src/js/index.js')
        .pipe(webpack({
            watch: false,
            mode: 'production',
            output: {
                filename: 'index.js',
            },
        }))
        .pipe(gulp.dest('public_html/js/'));
});
</pre>

$ npx gulp webpack


## webpack + Babel でレガシーブラウザに対応（応用）
Babel を導入することでレガシーブラウザにも対応できるようになる。

<https://babeljs.io/setup>  
<https://babeljs.io/docs/en/babel-preset-env/>
<https://github.com/babel/babel-loader>  

$ npm install -D babel-loader babel-core babel-preset-env


webpack.config.js に下記を追記して再ビルド。

<pref>
module.exports = {

    // .. 省略 ... //
    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        /**
                         * Babel 6.x なら 'presets': ['env']
                         * Babel 7.x なら 'presets': ['@babel/preset-env']
                         */
                        'presets': ['env']// Babel 6.x
                    }
                }
            }
        ]
    }
}
</pre>

$ npx webpack