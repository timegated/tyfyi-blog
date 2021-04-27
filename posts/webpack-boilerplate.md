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

Webpack works in tandem with a few other tools to accomplish this bundling, namely babel. Babel is for transpiling, which means that any javascript you write that contains newer features will be "backported" or recompiled into a version that works in any environment. The idea here is taking into consideration cross-browser and cross-internet-capacity (not everyone has great internet) by default when developing apps user modern techniques. 