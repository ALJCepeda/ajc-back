module.exports = {
  runtimeCompiler:true,
  chainWebpack: (config) => {
    config.resolve.symlinks(false)
  }
}
