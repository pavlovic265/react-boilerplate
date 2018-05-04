const webpack = require('webpack');
//1. what is entery
//2. where is output

// because operative system use diferent ways of showing path
// we can not just concante 2 strings
// so we will use path module from node
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development'; 

if(process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' });
}

//to let know webpack where is configuration
module.exports = (env) => {

  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');

  return  {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundel.js'
    },
    mode: "development",

    devtool: isProduction ? 'source-map' : 'inline-source-map',

    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: CSSExtract.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
          ]
        }),
      }]
    },

    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
      })
    ],

    devServer: {
      contentBase: path.join(__dirname, 'public'),
      publicPath: '/dist/',
      port: 3000,
      historyApiFallback: true
    }
  }
};