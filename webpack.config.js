var path = require('path');
var webpack = require('webpack');
var vendorDir = __dirname + '/node_modules';
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {

    addVendor: function (name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(new RegExp('^' + name + '$'));
    },

    debug: true,

    devtool: 'source-map',

    entry: {
        app: ['./src/main.js']
        //vendors: ['ractive', 'radio', 'reqwest']
    },

    /**
     * File loaders, lets webpack know how to import files of different types
     * Load & pre-process all main src js using babel, handlebars as raw, css & sass
     */
    module: {
        loaders: [
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            { test: path.join(__dirname, 'src'), loader: 'babel-loader', exclude: /(styles)/ },
            { test: /\.hbs$/, loader: 'raw-loader' },
            { test: /\.css/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { test: /\.scss$/, loaders: ["style", "css", "sass"] }
        ],
        noParse: []
    },

    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: 'build.js'
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.NoErrorsPlugin(),
        //new webpack.optimize.UglifyJsPlugin({minimize: false}),
        new ExtractTextPlugin('../styles/[name].css')
    ],

    resolve: { alias: {} }

};

config.addVendor('ractive', vendorDir + '/ractive/ractive.min.js');
config.addVendor('radio', vendorDir + '/radio/radio.min.js');

module.exports = config;