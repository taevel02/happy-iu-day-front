const path = require('path');

const baseConfig = {
	devtool: '',
	assetsRoot: path.resolve(__dirname, '../dist'),
	assetsSubDirectory: 'static',
	assetsPublicPath: '/',
};

module.exports = {
	dev: {
		...baseConfig,
		devtool: 'eval-cheap-module-source-map',
		cssSourceMap: true,

		// Dev Server
		autoOpenBrowser: false,
		errorOverlay: true,
		notifyOnErrors: true,
		host: '0.0.0.0',
		port: 8080,
	},

	build: {
		...baseConfig,
		devtool: 'source-map',
		productionSourceMap: true,

		// Template for index.html
		index: path.resolve(__dirname, '../dist/index.html'),
	},
};
