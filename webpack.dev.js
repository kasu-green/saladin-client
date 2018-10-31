var path = require( "path" );
var webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log('Development')
module.exports = function(env) {
  return {
    devtool: 'source-map',
    entry: [
      'babel-polyfill',
      './src/index.js'
    ],
    output: {
      filename: '[name].[chunkhash].js',
      publicPath: "/",
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new webpack.DefinePlugin({
        "API_URL": JSON.stringify("http://localhost:3000/")
      }),
      new HtmlWebpackPlugin({

          template:'index.html'
      })
    ],
    module: {
      loaders: [
        {
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'stage-1']
          }
        },
      {
          test: /\.css$/,
          loaders: ['style-loader','css-loader']
        },
          { test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/, loader: 'url-loader?limit=100000' },
        {
          test: /\.scss$/,
          loaders: ['style-loader',{
                loader: "css-loader", options: {
                    sourceMap: true
                }
            },{
                loader: "sass-loader", options: {
                    sourceMap: true
                }
            }]
        },
        {
          loader: "html-loader",
          test: /\.(html)$/,
        },

      ]
    },
    resolve: {
      extensions: [ '.js', '.jsx']
    },
    devServer: {
      historyApiFallback: true,
      contentBase: './'
    }
  }
};
