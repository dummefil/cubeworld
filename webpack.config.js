const webpack = require("webpack");
const path = require("path");

console.log(__dirname);
// http://webpack.github.io/docs/configuration.html
module.exports = {
	mode: 'development',
	entry: {
		main: "./src/Startup.ts",
	},
	devtool: 'eval',
	// Outputs compiled bundle to `./web/js/main.js`
	output: {
		// path: __dirname + "/dist/",
		filename: "[name].js",
		path: path.join(__dirname, 'build/js'),
		publicPath: '/build/js'
	},

	resolve: {
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
		alias: {
			'src': path.resolve(__dirname, './src'),
		},
	},

	module: {
		// Test file extension to run loader
		rules: [
			{
				test: /\.(glsl|vs|fs)$/,
				loader: "ts-shader-loader"
			},
			{
				test: /\.tsx?$/,
				exclude: [/node_modules/, /tsOld/],
				loader: "ts-loader"
			}
		]
	},

	// Enables dev server to be accessed by computers in local network
	devServer: {
		host: "0.0.0.0",
		port: 8000,
		static: {
			directory: path.join(__dirname, '.'),
		}
	}
}