const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    // app.use(proxy('/v999/authorize/sessions/', { target: 'http://api-health.daanlab.com', changeOrigin: true, secure: false, pathRewrite: {"^/login": "/"}}));
    // app.use('/login', proxy({ target: 'http://manager.yunkangdoctor.com', changeOrigin: true }));
};
