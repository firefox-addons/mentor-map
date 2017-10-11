module.exports = {
    entry: "./src/script.js",
    output: {
        path: __dirname,
        filename: "build.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] },
                }],
            },
            { test: /\.css$/, use: "style!css" }
        ]
    }
};