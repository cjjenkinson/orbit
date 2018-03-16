const webpack = require('webpack');

require('dotenv').config();

module.exports = {
  entry: ['react-hot-loader/patch', './src/main.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css/,
        loader: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpeg|jpg)$/,
        loader: 'file-loader',
      },
    ],
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      API_ENDPOINT: JSON.stringify(process.env.API_ENDPOINT),
    }),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
  },
};
