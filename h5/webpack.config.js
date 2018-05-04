var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'build.js'
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    devtool: 'source-map',
    module: {
        loaders:[{
            test:/\.js$/,
            exclude:/node_modules/,
            loader:"babel-loader",
            query:{
                presets:["es2015","stage-2","react"]
            }
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: ["style-loader", "css-loader"]
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ["style-loader", "css-loader", "sass-loader"]
        }, {
            test: /\.(png|jpe?g|gif|svg|ttf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 8192,
                name: '../image/[name].[ext]'
            }
        }]
    }
}
