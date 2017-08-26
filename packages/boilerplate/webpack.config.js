module.exports = {
	entry: './src/index.js',
	output: {
		filename: '../core/dist/public/js/app.js',
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
		],
	},
};
