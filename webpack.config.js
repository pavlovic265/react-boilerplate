const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDevMode = process.env.NODE_ENV !== 'production'

module.exports = () => {

  return  {
    //By default webpack will search for './src/index.js'
    // entry: './src/index.js',
    //By default webpack will spit for './dist/main.js'
    // output: {
    //   path: path.join(__dirname, 'public', 'dist'),
    //   filename: 'bundel.js'
    // },
    devtool: "source-map",

    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.(js|jsx)$/,
          exclude: /node_modules/
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true }
            }
          ]
        },
        {
          test: /\.(scss|css)$/,
          use: [
            isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader", options: {
                  sourceMap: true
              }
            }, {
              loader: "sass-loader", options: {
                  sourceMap: true
              }
          }]
        }

      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
      new MiniCssExtractPlugin({
        filename: isDevMode ? "[name].css" : "[name].[hash].css" ,
        chunkFilename: isDevMode ? "[id].css" : "[id].[hash].css" 
      }),
    ]
  }
};