const path = require('path')

function assetsPath(_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production' ? 'static' : 'static'

  return path.posix.join(assetsSubDirectory, _path)
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

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
      '/api': {
        //要访问的跨域的api的域名
        target: 'http://192.168.0.59:7300/mock/5be13f9a64f22d05a2a309b0/elemiao',
        ws: false,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
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
      .end()
      

    const imgRule = config.module.rule('images')
    imgRule.uses.clear()
    imgRule
      .test(/\.(png|jpe?g|gif)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 8192,
        name: assetsPath('img/[name].[hash:7].[ext]')
      })
      .end()

    const mediaRule = config.module.rule('media')
    mediaRule.test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 8192,
        name: assetsPath('media/[name].[hash:7].[ext]')
      })
      .end()

    const fontsRule = config.module.rule('fonts')
    fontsRule.test(/\.(woff2?|eoyat|ttf|otf)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 8192,
        name: assetsPath('fonts/[name].[hash:7].[ext]')
      })
      .end()
  },
}
