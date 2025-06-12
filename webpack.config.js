const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { DefinePlugin } = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const tsconfig = require("./tsconfig.json");

const alias = Object.keys(tsconfig.compilerOptions.paths).reduce((result, aliasPath) => {
    const resolvePath = tsconfig.compilerOptions.paths[aliasPath][0].replace("*", "");
    result[aliasPath.replace("/*", "")] = path.resolve(path.join(__dirname, "src"), resolvePath);
    return result;
}, {});

const appConfig = {
    CONFIG_API_SERVERS: JSON.stringify(process.env.CONFIG_API_SERVERS),
    CONFIG_API_URL: JSON.stringify(process.env.CONFIG_API_URL)
};

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? false : "source-map",
    entry: {
        main: "./src/index.tsx"
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /.(png|svg|ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [
        new NodePolyfillPlugin(),
        new DefinePlugin(appConfig),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Frever CMS",
            template: "public/index.html"
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "public/assets",
                    to: "assets"
                },
                {
                    from: "public/favicon.ico",
                    to: "favicon.ico"
                }
            ]
        })
    ],
    devServer: {
        static: "./dist",
        historyApiFallback: true
    }
};
