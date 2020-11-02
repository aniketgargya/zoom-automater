const path = require("path");

module.exports = {
    entry: {
        background: path.join(__dirname, "src", "background.js"),
        content: path.join(__dirname, "src", "content.js"),
        popup: path.join(__dirname, "src", "popup.js")
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};