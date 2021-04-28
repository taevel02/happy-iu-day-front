const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const config = require('./config');
const baseWebpackConfig = require('./webpack.config.base');

const HOST = config.dev.host;
const PORT = config.dev.port;

const webpackConfig = merge(baseWebpackConfig, {
	mode: 'development',
	devtool: config.dev.devtool,
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	devServer: {
		clientLogLevel: 'warning',
		historyApiFallback: true,
		host: HOST,
		port: PORT,
		overlay: config.dev.errorOverlay
			? { warnings: false, errors: true }
			: false,
		publicPath: config.dev.assetsPublicPath,
		quiet: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'IU Special Days',
			template: '../public/index.html',
			filename: 'index.html',
			inject: true,
		}),
		new FriendlyErrorPlugin({
			compilationSuccessInfo: {
				messages: [`Your application is running here: http://${HOST}:${PORT}`],
			},
			onErrors: (severity, errors) => {
				if (severity !== 'error') return;

				notifier.notify({
					title: 'Webpack error',
					message: `${severity}: ${errors[0].name}`,
				});
			},
			clearConsole: true,
		}),
	],
});

module.exports = webpackConfig;
