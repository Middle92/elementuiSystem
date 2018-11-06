const path = require('path')


function resolve(dir) {
  return path.join(__dirname, dir)
}

function assetsPath(_path) {
  const assetsSubDirectory = 'static'
  return path.posix.join(assetsSubDirectory, _path)
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
    svgRule.include.add(resolve('src/icons'))
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    const imgRule = config.module.rule('img')
    imgRule.uses.clear()
    imgRule.exclude.add(resolve('src/icons'))
    imgRule
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10000,
        name: assetsPath('img/[name].[hash:7].[ext]')
      })

    const mediaRule = config.module.rule('media')
    mediaRule.uses.clear()
    mediaRule
      .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10000,
        name: assetsPath('media/[name].[hash:7].[ext]')
      })

    const fontsRule = config.module.rule('fonts')
    fontsRule.uses.clear()
    fontsRule
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10000,
        name: assetsPath('fonts/[name].[hash:7].[ext]')
      })
  },
}
