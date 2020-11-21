const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
    entry: {
        background: path.join(__dirname, "src", "background", "index.ts"),
        content: path.join(__dirname, "src", "content", "index.ts"),
        popup: path.join(__dirname, "src", "popup", "index.tsx")
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist"),
        publicPath: ""
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [["@babel/preset-react"], ["@babel/preset-env"]]
                        }
                    },
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "images"
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    }
};
