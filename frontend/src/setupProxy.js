const { createProxyMiddleware } = require("http-proxy-middleware");
const proxy = {
  target: "http://localhost:3000",
  changeOrigin: true,
};
module.exports = function (app) {
  app.use("/partidas", createProxyMiddleware(proxy));
  app.use("/liquipedia", createProxyMiddleware(proxy));
  app.use("/fetchdata", createProxyMiddleware(proxy));
};
