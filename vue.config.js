module.exports = {
  publicPath: './',
  runtimeCompiler: true,
  productionSourceMap: false,
  chainWebpack: config => {
    config.module
    .rule('less')
    .oneOf('vue')
    .use('px2rem-loader')
    .loader('px2rem-loader')
    .before('postcss-loader')
      .options({ remUnit: 192, remPrecision: 4 })
      .end()
  }
}