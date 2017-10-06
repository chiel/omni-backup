/* eslint-disable global-require */
const CSSPlugin = require('modular-css-webpack/plugin');

module.exports = {
	entry: './src/index.jsx',
	output: {
		filename: '../core/dist/public/js/omni.js',
	},

	devtool: 'eval-source-map',

	resolve: {
		extensions: ['.js', '.jsx'],
		modules: ['src', 'node_modules'],
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: 'modular-css-webpack/loader',
			},
		],
	},

	plugins: [
		new CSSPlugin({
			css: '../core/dist/public/css/omni.css',
			json: '../core/dist/styles.json',
			after: [
				require('postcss-import')(),
				require('postcss-nested'),
				require('postcss-color-function'),
				require('postcss-inline-svg')(),
			],
		}),
	],
};
