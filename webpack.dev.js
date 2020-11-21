const { merge } = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const common = require("./webpack.config");

module.exports = merge(common, {
    mode: "development",
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{ from: "static" }]
        }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/popup/index.html",
            chunks: ["popup"]
        })
    ]
});
