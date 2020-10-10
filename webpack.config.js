const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  return {
    entry: {
      background: './src/background.ts',
      options: './src/options.tsx',
      popup: './src/popup.tsx',
      ['key-listener']: './src/key-listener.ts',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: [/node_modules/, /dist/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                plugins: ['@babel/proposal-class-properties', '@babel/proposal-object-rest-spread'],
              },
            },
            {
              loader: 'ts-loader',
            },
          ],
        },
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, 'build'),
      historyApiFallback: true,
      host: '0.0.0.0',
      compress: true,
      hot: true,
      port: 4000,
      publicPath: '/',
      openPage: 'options.html',
    },
    devtool: options.mode === 'production' ? false : 'source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: './template/index.html',
        filename: 'options.html',
        chunks: ['options'],
      }),
      new HtmlWebpackPlugin({
        template: './template/index.html',
        filename: 'popup.html',
        chunks: ['popup'],
      }),
      new CopyPlugin({
        patterns: [{ from: 'images', to: 'images' }, { from: './manifest.json' }],
      }),
    ],
  };
};
