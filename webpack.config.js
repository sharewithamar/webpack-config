const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
let mode = 'development';
let target = 'web';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  target = 'browserslist';
}
module.exports = {
  mode: mode,
  target: target,

  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        //type: 'asset/resource',
        // type: 'asset/inline',
        //defaule max size 8kb. auto detects whether it should be inline or image directory
        type: 'asset',
        /*   parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024,
          },.
        }, */
      },
      {
        //test: /\.s?css$/i,
        test: /\.(s[ac]|c)ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { publicPath: '' } },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  //devtool: false, //to view babel transpiled old support code in main
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
};
