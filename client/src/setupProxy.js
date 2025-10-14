const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // proxy only API routes to backend
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      logLevel: 'warn',
    })
  );
};
