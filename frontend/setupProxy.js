const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://socialapp.local:5000',
      changeOrigin: true,
      secure: false,
    })
  );
};
