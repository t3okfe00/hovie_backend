import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: "production",
  entry: "./src/server.ts", // Update this path to your main server file
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.cs$/,
        use: "raw-loader", // or node-loader depending on your use case
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: {
    "node-pre-gyp": "commonjs node-pre-gyp",
  },
};
