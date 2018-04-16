var path = require( "path" );
var webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
console.log(__dirname);
module.exports = function(env) {
  return {
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
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, 'img'), to: path.resolve(__dirname, 'dist/img')
      }]),
      new HtmlWebpackPlugin({

          template:'index.html'
      }),

      new webpack.optimize.UglifyJsPlugin({
         compressor: {
             warnings: false
         }
       }),
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
          loaders: ['style-loader','css-loader','sass-loader']
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
}
;
