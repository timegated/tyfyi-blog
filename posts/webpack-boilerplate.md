---
title: 'Webpack Boilerplate'
date: '2021-04-27'
---

I came to webpack shortly after I got started learning React two years ago. 

At first React seemed like it was doing all these mysterious things under the hood while I watched the scripts run in my other terminal after starting up the development environment. 

I had questions such as:

- What exactly is going on here?
- How is this a benefit to me?
- What do all those lines of text the terminal keeps spitting out mean?
- What is a bundle?

When most people get started with a framework like React they generally use create-react-app (the most popular tool for bootstrapping a React project), which is what I did for probably the first three months of me using the library. It dawned on me at some point that in a professional environment for production apps CRA probably is not used in the way I was using to set up smaller projects for learning purposes. 

So that brought me to webpack, the underlying bundler tool that makes all the script commands work in CRA. 

```json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
```

Under the hood here webpack is doing some bundling. Bundling is basically recompiling code into an "uglier" form for optimization purposes so what you end up with is a more performant site right off the bat, but that's just one of the benefits.

There is a lot to unpack as far delving into what react-scripts is doing, there are many files and functions that are doing a lot of heavy lifting in the background whenever you run one of the above commands in your terminal. 

Webpack works in tandem with a few other tools to accomplish this bundling, namely babel. Babel is for transpiling, which means that any javascript you write that contains newer features will be "backported" or recompiled into a version that works with older browsers. The idea here is taking into consideration cross-browser and cross-internet-capacity (not everyone has great internet) by default when developing apps using modern techniques.

So what set up do I use? 

Webpack works with entry points and templates (for html files). If you don't specify a template that's also fine, it will generate one for you. For the JS an index.js file must be specified as the main point where any other JS you write will be bundled. 

I generally start with three different config files, a common, dev, and production configuration. The common config specifies the main JS file, the html template, and the image loader. Dev config looks for the bundle currently being loaded as well as a template and modules for loading css. 

Common:
```js
const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/js/index.js",
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpg|gif|pdf)$/i,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs",
          },
        },
      },
    ],
  },
};
```
Dev:
```js
const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
});
```

Finally the production config, when you're ready to run your build command, looks for filename, content hash, and uses a few plugins to both minify the code, remove whitespace and comments, and optimize your css output. Ultimately what the prod config file does is reduce the size of all your files and outputs them in an minified way. 

Prod: 
```js
const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contentHash].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 
          "css-loader", 
          "sass-loader",
        ],
      },
    ],
  },
});
```

This is basically the starting point for me when building a site or app with webpack and I've used this config for my portfolio site. 