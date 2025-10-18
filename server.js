const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const TARGET_URL = 'https://02engine-02git.hf.space';

// 创建代理中间件，代理所有路径到目标 URL
app.use(
  '/',
  createProxyMiddleware({
    target: TARGET_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/': '',  // 保持路径不变，直接转发
    },
    onProxyRes: (proxyRes, req, res) => {
      // 可选：添加自定义头，如 CORS 支持
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    },
    logLevel: 'warn',  // 减少日志输出
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server running on port ${port}, forwarding to ${TARGET_URL}`);
});

module.exports = app;  // Vercel 要求导出 app
