module.exports = {
  /** 区分打包环境与开发环境
   * process.env.NODE_ENV==='production'  (打包环境)
   * process.env.NODE_ENV==='development' (开发环境)
   * baseUrl: process.env.NODE_ENV==='production'?'':'',
   */
  // 基本路径
  baseUrl: '/',
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 9527, //端口
    https: false,
    hotOnly: false,
    proxy: { // 配置跨域
      '/': {
        //要访问的跨域的api的域名
        target: process.env.NODE_ENV === 'production' ? '' : 'http://192.168.0.59:7300/mock/5bd2b74e2d630d05a5b4287c/pmcat',
        ws: false,
        changOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }, // 设置代理
    before: app => {}
  },
  chainWebpack: config => {
    //更改webpack的loader配置
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
}
