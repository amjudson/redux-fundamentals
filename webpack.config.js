var path = require('path');

module.exports = {
  mode: "development",
	entry: "./public/js/main.js", // primary JS entry point
	output: {
		// save the bundle here
		filename: "bundle.js",
		path: path.resolve(__dirname, "public/js/build")
	},
	module: {
		rules: [
			{
				test: /\.js$/, // transform all .js files
				exclude: /(node_modules)/, // except for node_modules
				loader: "babel-loader", // apply the bable-loader to compile the files
				query: {
					presets: ["@babel/react", "@babel/env"] // load the react, es2015 babel settings
				}
			}
		]
	}
};