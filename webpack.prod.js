import path from "path";
import { fileURLToPath } from "url";
import webpack from "webpack"; // Import webpack for plugins

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: "production", // Enable production optimizations
  target: "node", // Target Node.js runtime
  entry: "./src/server.ts", // Entry point of your application
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "server.mjs", // Main output file
    module: true, // Enable ES Module output
    libraryTarget: "module",
  },
  experiments: {
    outputModule: true, // Enable module output
  },
  resolve: {
    extensions: [".ts", ".js"], // Resolve both TypeScript and JavaScript
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Transpile TypeScript files
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  externals: [/(node_modules)/], // Exclude Node.js modules to reduce bundle size
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /\.(html|cs)$/, // Ignore files ending with .html and .cs
    }),
  ],
};
