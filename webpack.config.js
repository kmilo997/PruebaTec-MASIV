const path = require('path')
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
require("babel-polyfill");


module.exports = {
    entry: ["babel-polyfill", './src/index.js'],
    output:{
        path: __dirname+'/dist',
        filename:'bundle.js'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            { 
                test: /\.(c|sc|sa)ss$/, 
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                      loader: 'sass-loader',
                      // Requires sass-loader@^7.0.0
                      options: {
                        implementation: require('sass'),
                        indentedSyntax: true // optional
                      },
                      // Requires >= sass-loader@^8.0.0
                      options: {
                        implementation: require('sass'),
                        sassOptions: {
                          indentedSyntax: true // optional
                        },
                      },
                    },
                ],
              }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new VuetifyLoaderPlugin()
        /* new MiniCssExtractPlugin({
            filename: "./scss/main.scss",
        })  */
    ]
}