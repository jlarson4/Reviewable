/*
 * webpack.config.js
 * version 1.0.0
 */

var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/public/js');
var APP_DIR = path.resolve(__dirname, 'src/app/js');

var config = {
    entry: APP_DIR + '/app.js',
    output: {
        path: BUILD_DIR,
        filename: 'build.min.js'
    },
    module : {
        loaders :[{
            test : /\.js?/,
            include : APP_DIR,
            loader : 'babel-loader'
        }]
    }
};

module.exports = config;