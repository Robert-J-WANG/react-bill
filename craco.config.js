// 绝对路径@配置
const path = require("path");

module.exports = {
  devServer: {
    port: 3006,
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
