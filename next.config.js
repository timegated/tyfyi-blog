module.exports = {
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config;
  },
  compiler: {
    styledComponents: true
  },
  export: "standalone"
}