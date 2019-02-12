module.exports = {
  baseUrl:'/e-commerce/dist/',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/e-commerce/'
    : '/'
}