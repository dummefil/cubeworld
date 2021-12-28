const webpack = require("webpack");
const path = require("path");

const common = {
	mode: 'development',
	output: {
		filename: "js/[name].js"
	},
}

const electronConfig = Object.assign(common, {
	entry: {
		main: "./Run.ts",
	},
	target: 'electron-main',
})

const webConfig = Object.assign(common, {
	entry: {
		main: "./src/App.ts",
	},
	target: 'web',
	devtool: 'eval',
	resolve: {
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
		// Shortcuts to avoid up-one-level hell: 
		// Turns "../../../utils" into "Utils"
		alias: {
			Utils: path.resolve(__dirname, "./src/utils/"),
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
		publicPath: "/web/",
		disableHostCheck: true
	}
})

module.exports = [webConfig, electronConfig]