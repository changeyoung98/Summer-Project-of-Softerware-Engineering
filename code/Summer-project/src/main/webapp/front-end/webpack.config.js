

module.exports = {
  entry: './index.js',

  output: {
    filename: 'bundle.js',
    publicPath: './js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test:/(\.less)$/,
        use:[{loader:'style-loader'},
          {loader:'css-loader'},
          {loader:'postcss-loader'},
          {loader:'less-loader'}]
      },
      {
        test:/\.(eot|swf|woff|ttf)$/,
        loader:'file-loader'
      }
    ]
  }
}


