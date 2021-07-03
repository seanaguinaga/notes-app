const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // Ensures no server modules are included on the client.
      config.plugins.push(new webpack.IgnorePlugin(/lib\/server/));
    }
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join("./node_modules/ionicons/dist/ionicons/svg"),
            to: path.join(__dirname, "public/svg"),
          },
        ],
      })
    );
    return config;
  },
  target: "experimental-serverless-trace",
  projectRoot: __dirname,
  reactStrictMode: true,
};
