module.exports = {
  devServer: {
    open: true
  },
  lintOnSave: false
}
const isPord = process.env.NODE_ENV === 'production'
module.exports = {
  publicPath: isPord ? './' : '/', // 处理 相对路径问题
  productionSourceMap: false // 优化不要map文件
}
