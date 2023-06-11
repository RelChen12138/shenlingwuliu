'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const name = defaultSettings.title || 'pinda' // page title
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '.',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    proxy: {
      '/api1/apiLogin': {
        //   target: 'http://canzg-wsl.itheima.net/enterpise',
        // target: 'http://172.17.2.120:8080',
        target: 'http://172.17.0.60:8760/api',
        ws: true,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api1/apiLogin': ''
        }
      },
      '/api1': {
        //   target: 'http://canzg-wsl.itheima.net/enterpise',
        // target: 'http://172.16.43.24:18093', // 家乐
        // target: 'http://slwl-geteway-t.itheima.net/manager', // 测试环境
        // target: 'http://172.16.17.63:9527/manager', // 小兵环境
        target: process.env.VUE_APP_URL,
        ws: true,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api1': ''
        }
      }
      // '/web-manager': {
      //   // target: 'http://68.79.7.219:8080/tms/api/web-manager',
      //   target: 'http://pinda.itheima.net/tms/api/web-manager',
      //   // target: 'http://68.79.7.219:8760/api',
      //   // target: 'http://68.79.7.219:8760/api',
      //   // target: 'http://39.100.244.120:8161', // 本地直连
      //   // target: 'https://mock.boxuegu.com/mock/890',
      //   // target: 'http://39.100.244.120:8760/api/web-manager', // 线上网关地址
      //   // target: 'http://39.100.244.120:8760/api', // 本地网关地址
      //   changeOrigin: true, // needed for virtual hosted sites
      //   ws: true, // proxy websockets
      //   pathRewrite: {
      //     '^/web-manager': ''
      //   }
      // },
      // '/web-dispatch': {
      //   // target: 'http://68.79.7.219:8080/tms/api/web-dispatch',
      //   target: 'http://pinda.itheima.net/tms/api/web-dispatch',
      //   changeOrigin: true, // needed for virtual hosted sites
      //   ws: true, // proxy websockets
      //   pathRewrite: {
      //     '^/web-dispatch': ''
      //   }
      // },
      // '/agency': {
      //   // target: 'http://68.79.7.219:8080/tms/api/agency',
      //   target: 'http://pinda.itheima.net/tms/api/agency',
      //   changeOrigin: true, // needed for virtual hosted sites
      //   ws: true, // proxy websockets
      //   pathRewrite: {
      //     '^/agency': ''
      //   }
      // },
      // '/web-druid': {
      //   // target: 'http://68.79.7.219:8080/tms/api/web-druid',
      //   target: 'http://pinda.itheima.net/tms/api/web-druid',
      //   changeOrigin: true, // needed for virtual hosted sites
      //   ws: true, // proxy websockets
      //   pathRewrite: {
      //     '^/web-druid': ''
      //   }
      // },
      // '/user': {
      //   // target: 'http://68.79.7.219:8080/tms/api/user',
      //   target: 'http://pinda.itheima.net/tms/api/user',
      //   changeOrigin: true, // needed for virtual hosted sites
      //   ws: true, // proxy websockets
      //   pathRewrite: {
      //     '^/user': ''
      //   }
      // }
    }
    // overlay: {
    //   warnings: false,
    //   errors: true
    // },
    // before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    // 配置需要排出的包
    externals: {
      'vue': 'Vue',
      'element-ui': 'ELEMENT',
      'vue-router': 'VueRouter',
      'jquery': 'jQuery',
      'vue-baidu-map': 'VueBaiduMap'
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', config =>
        config.devtool('cheap-source-map')
      )

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        // 这里可以添加多个 SCSS 文件，例如：
        path.resolve(__dirname, 'src/styles/index.scss')
      ]
    }
  }
}
