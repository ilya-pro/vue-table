module.exports = {
  //assetsDir: 'mock',
  /*configureWebpack: {
    devtool: 'source-map'
  },*/
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
      ? '/vue-table-gh-pages/'
      : '/',
  "transpileDependencies": [
    "vuetify"
  ]
}
