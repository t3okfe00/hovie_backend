// import webpack from "webpack"; // Import webpack for plugins

export default {
  mode: "production",
  target: "node",
  entry: "./src/server.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.mjs",
    module: true,
    libraryTarget: "module",
  },
  experiments: {
    outputModule: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  externals: [/(node_modules)/],
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /\.(html|cs)$/,
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "production"
      ), // Inject NODE_ENV
    }),
  ],
};
