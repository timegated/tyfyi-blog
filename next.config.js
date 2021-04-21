const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript({
  target: 'serverless',
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config;
  }
});