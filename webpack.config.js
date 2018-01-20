var nodeExternals = require('webpack-node-externals');
var path = require( "path" );
var webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  devtool: 'source-map',
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000
    },
    watch: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    },
    entry: {
      main:'./src/scripts/app/main.js',
      vendor: ['babel-polyfill','jquery','jquery-ui','knockout','knockout-postbox','knockout-amd-helpers',
      'knockout-mapping','hash-router','datatables.net','datatables.net-bs','moment'],

    },
    output: {
      filename: '[name].[chunkhash].js',
      publicPath: "",
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
       alias: {
           "knockout": path.join( __dirname, "/node_modules/knockout/build/output/knockout-latest" ),
           "knockout-mapping": path.join( __dirname, "/node_modules/knockout-mapping/dist/knockout.mapping.min" ),
           "knockout-postbox": path.join( __dirname, "/node_modules/knockout-postbox/build/knockout-postbox.min" ),
           "knockout-amd-helpers":path.join( __dirname, "/node_modules/knockout-amd-helpers/build/knockout-amd-helpers.min" ),
           "jquery": path.join( __dirname, "/node_modules/jquery/src/jquery"),
        /*   "bootstrap":path.join( __dirname, "/node_modules/bootstrap/dist/js/bootstrap.min" ),
           "bootstrap-css":path.join( __dirname, "/node_modules/bootstrap/dist/css/bootstrap.min.css" ),*/
           'hash-router':path.join(__dirname,'/bower_components/hash-router/src/hash-router.es6'),
           'jquery-ui/datepicker':path.join(__dirname,'/node_modules/jquery-ui/ui/widgets/datepicker'),
           'moment':path.join(__dirname,'/node_modules/moment/min/moment.min'),
       }
    },
    plugins: [
  //    new CleanWebpackPlugin(['dist']),
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
      }),
      new HtmlWebpackPlugin({

          template:'src/www/index.html'
      }),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),


      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      }),
      /*new webpack.optimize.UglifyJsPlugin({
       compressor: {
           warnings: false
       }
     }),*/
     /*
      new webpack.optimize.CommonsChunkPlugin({
       children: true,
       // (use all children of the chunk)
       async: true,
       // (create an async commons chunk)
     }),*/
    ],
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style-loader']
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: "file-loader"
        },
        {
          test: /\.(woff|woff2)$/,
          loader:"url-loader?prefix=font/&limit=5000"
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=application/octet-stream"
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&mimetype=image/svg+xml"
        },
        {
          test: /bootstrap\/js\//,
          loader: 'imports?jQuery=jquery'
        },
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&minetype=application/font-woff"
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&minetype=application/octet-stream"
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: "file-loader"
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=10000&minetype=image/svg+xml"
        },
        {
          loader: "html-loader",
          test: /\.(html)$/,
        },
        {
          loader: "css-loader",
          test: /\.(css)$/,
        },
        {
          loaders: ["style-loader","css-loader","sass-loader"],
          test: /\.(scss)$/,
        },
        /*{
          test: /hash-router/,
          loader: 'imports-loader?this=window'
        },*/
        {
          loader: "babel-loader",

          exclude: /(node_modules | bower_components)/,

          test:  /(\.jsx?|\.es6)$/,

          query: {
            presets: [['es2015']]
          }
        },
      ]
    },
  //  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  //  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder

};
