import path from "path";
import { WebpackBuilder } from "./src-modules/webpack-builder";
import HTMLWebpackPlugin from "html-webpack-plugin";

const BASE_DIRS = {
  APP: "./src-app",
  MODULES: "./src-modules",
  DIST: "./public",
};

interface IDevServer {
  port: number;
  compress: boolean;
  open: boolean;
}

export = WebpackBuilder.create()
  .mode("development")
  .context(path.resolve(__dirname, BASE_DIRS.APP))
  .entry("./index.tsx")
  .output({
    path: path.resolve(__dirname, BASE_DIRS.DIST),
    filename: "[name]-[hash].js",
  })
  .addRule({
    test: /\.tsx?$/,
    use: [
      {
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          compilerOptions: {
            target: "es5",
            module: "es6",
          },
        },
      },
    ],
  })
  .addPlugin(
    new HTMLWebpackPlugin({
      template: "./index.html",
      title: "Sample Repo",
    }),
  )
  .extra<IDevServer>("devServer", {
    port: 9001,
    compress: true,
    open: true,
  })
  .resolve({
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  })
  .build();
