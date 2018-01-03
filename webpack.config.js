const path = require('path');
const webpack = require('webpack');


module.exports = {
	entry: [
       'webpack/hot/only-dev-server',
	   './src/index.js'
	   ],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"), // 获得当前文件所在目录的完整目录名：
		inline: true,
		// compress: true,
		port: 3333
	},
	module: {
		rules: [
		  { test: /\.css$/, loader: 'style-loader!css-loader' },
		  { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
		  {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
		  {

			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: [
              'babel-loader'
			]
	      }
		]
		
	},
	plugins: [
   // new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dist/vendors-manifest.json')
    })
  
  ]
}