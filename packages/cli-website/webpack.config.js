const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.ts',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				options: { transpileOnly: true },
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			templateContent: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
		<title>@carnesen/cli</title>
		<link rel="stylesheet" href="assets/css/main.css">
  </head>
	<body>
			<h3 style="text-align: center">
				<a href="https://github.com/carnesen/cli">@carnesen/cli</a>:
				A command-line interface (CLI) framework for Node.js and web browser
			</h3>
			<div id="terminal-container"></div>
  </body>
</html>`,
		}),
	],
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist/'),
	},
	resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
};
