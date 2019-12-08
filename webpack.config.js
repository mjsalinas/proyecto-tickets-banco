module.exports = {
    entry: './app/index.js',
    output: {
      path: __dirname + '/client/js',
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          use: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        }
      ]
    }
  };
  