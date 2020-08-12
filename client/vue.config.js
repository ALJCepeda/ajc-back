module.exports = {
  runtimeCompiler: true,
  lintOnSave: false,
  devServer: {
    host: '0.0.0.0',
    port: 8000
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(false);
  }
};
