const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/openapi-data',
    createProxyMiddleware({
      target: 'http://data.ekape.or.kr',
      changeOrigin: true,
    })
  )
}
