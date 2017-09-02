const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CSSLoader = {
    loader: 'css-loader',
    options: {
        sourceMap: true
    }
};

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '.'),
        library: 'js360',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader']
            })
        }]
    },
    plugins: [
      new ExtractTextPlugin('style.css')
    ]
}
