const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
  }, 
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My React App', // Set your app's title
      template: 'public/index.html', // Path to your index.html template
      // Configure CSP directives
      meta: {
        'http-equiv': {
          'Content-Security-Policy': "default-src 'self' https://fonts.gstatic.com; font-src 'self' https://fonts.gstatic.com",
          // Add more directives as needed
        }
      }
    })
    // ... other plugins ...
  ],
};
