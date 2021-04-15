module.exports = {
  devServer: {
    host: "localhost",
    port: 8080,
    proxy: {
      "/": {
        //websocket
        ws: false,
        target: "http://localhost:8081",
        //发送请求的请求头host会被设置target
        changeOrigin: true,
        //补充协议请求地址
        pathRewrite: {
          "^/": "",
        },
      },
    },
  },
};
