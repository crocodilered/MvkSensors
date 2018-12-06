const path = require('path')
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/scripts/index.js',
    sensors: './src/scripts/sensors.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: "[name].bundle.js"
  },
  plugins: [
    new copyWebpackPlugin([
      { from: './src/html/index.html', to: 'index.html' },
      { from: './src/html/sensors.html', to: 'sensors.html' }
    ])
  ],
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: { minimize: true }
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'i/',
              publicPath: '/i/'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env'],
          plugins: ['transform-runtime']
        }
      }
    ]
  }
}
