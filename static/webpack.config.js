var path = require("path");
var webpack = require("webpack");
// var ExtractTextPlugin = require("extract-text-webpack-plugin");

var OLDSPEAK_VERSION = '1';

// let extractCSS = new ExtractTextPlugin('[name].css');
// let extractLESS = new ExtractTextPlugin('[name].less');

var REACT_ENTRY = {
    entry: {
        "01d5p34k": path.join(__dirname, 'src', 'main.jsx')
    },
    output: {
        filename: "dist/[name]." + OLDSPEAK_VERSION + ".js"
    },
    module: {
        loaders: [
            { test: /\.jsx?$/,
              exclude: /node_modules/,
              loader: "babel-loader"
            },
            { test: /\.css$/, loader: "style!css" },
            { test: /\.scss$/, loader: "style!css!sass" },
            { test: /\.less$/, loader: "style!css!less" },
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9\.=]+)?$/,
              loader: 'file-loader' },
            { test: /\.(gif|png|jpg|jpeg)?$/,
              loader: 'url-loader' }
        ]
    }
}

// var CSS_ENTRY = {
//     entry: {
//         "01d5p34k": path.join(__dirname, 'styles', 'app.less')
//     },
//     output: {
//         filename: "dist/[name]." + OLDSPEAK_VERSION + ".css"
//     },
//     module: {
//         loaders: [
//             { test: /\.s[ac]ss$/i, loader: extractCSS.extract(['css','sass']) },
//             { test: /\.less$/i, loader: extractLESS.extract(['css','less']) },
//         ]
//     }
// }

// export the targets
module.exports = [
    REACT_ENTRY

]
