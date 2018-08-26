const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        '%': resolve('src/views'),
        '&': resolve('src/components')
      }
    },
    node: {
      fs: 'empty'
    }
  },
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('shebang-loader')
      .test(/\.js$/)
      .use('shebang-loader')
      .loader('shebang-loader')
      .end()
  }

}
