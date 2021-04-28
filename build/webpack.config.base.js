const path = require('path');

const webpackConfig = {
	context: __dirname,
	entry: '../src/index.js',
	output: {
		path: path.resolve(`${__dirname}/../dist`),
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.scss'],
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'eslint-loader',
					options: {
						emitWarning: true,
					},
				},
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						fallback: 'file-loader',
						name: 'images/[name].[ext]',
					},
				},
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						fallback: 'file-loader',
						name: 'media/[name].[ext]',
					},
				},
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000,
						fallback: 'file-loader',
						name: 'fonts/[name].[ext]',
					},
				},
			},
		],
	},
};

module.exports = webpackConfig;
