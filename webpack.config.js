// const path = require("path");
// const CopyPlugin = require("copy-webpack-plugin");

// module.exports = {
//   mode: "development",
//   entry: "./src/index.js",
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "bundle.js",
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(gltf)$/,
//         use: [
//           {
//             loader: "file-loader",
//             options: {
//               name: "models/[name].[ext]", // Output path for GLTF files
//             },
//           },
//         ],
//       },
//     ],
//   },
//   optimization: {
//     minimize: false,
//   },
//   plugins: [
//     new CopyPlugin({
//       patterns: [
//         { from: "src/models", to: "" }, //to the dist root directory
//       ],
//     }),
//   ],
//   resolve: {
//     extensions: [".js", ".jsx"], // File extensions to resolve
//   },
// };

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(gltf)$/,
        include: path.resolve(__dirname, "src/models"), // Include only files in the "src/models" directory
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/models/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/models", to: "models" }, // Copy models from src/models to the assets/models directory
      ],
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
