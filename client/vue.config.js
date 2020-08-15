module.exports = {
  runtimeCompiler: true,
  lintOnSave: false,
  devServer: {
    host: process.env.CLIENT_HOST,
    port: process.env.CLIENT_PORT
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(false);
  }
};
