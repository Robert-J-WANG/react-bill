const path = require("path");

module.exports = {
  devServer: {
    port: 3005,
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
