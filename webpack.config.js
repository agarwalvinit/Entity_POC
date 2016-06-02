module.exports = {
    entry: "./index.js",
    output: {
        path: './build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { 	test: /\.css$/,
            	loader: "style!css" 
            },
            {
                test: /\.scss$/,
                loader: 'style!' + 'css?sourceMap' + '!sass?sourceMap'
            },
            {
		        test: /\.(js|jsx)/,
		        exclude: /node_modules/,
		        loader: 'babel-loader',
		        query:
		        {
		          presets:['es2015','react']
		        }
		      }
        ]
    },
    devtool: 'source-map'
};