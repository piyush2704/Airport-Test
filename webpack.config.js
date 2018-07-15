const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';
const isProd = env === 'production';


const extractScss = new ExtractTextPlugin({
  filename: 'index.css',
  disable: isDev
});

module.exports = {
  entry: {
    bundle: './src/index.js'
  },
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'My Awesome application',
      myPageHeader: 'Hello World',
      template: './src/booking.html',
    }),
    extractScss
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /(\.css|\.scss)$/,
      exclude: /node_modules/,
      use: extractScss.extract({
        use: [
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ],
        fallback: 'style-loader'
      })
    },  {
            test: /\.(png|jp(e*)g|svg)$/,  
            use: [{
                loader: 'url-loader',
                options: { 
                    limit: 800000, // Convert images < 8kb to base64 strings
                    name: 'images/[hash]-[name].[ext]'
                } 
            }]
        }/*,
    {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: './src/img/img_[hash:6].[ext]'
          }
        }
    ]
	},*/
 /* {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'responsive-loader',
          options: {
            sizes: [300],
            placeholder: true,
            placeholderSize: 50,
            name: 'assets/images/[name]-[width].[ext]'
          }
        }
      }*/]
  }
};