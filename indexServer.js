const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

// Webpack build + reload configuration
(function () {
  // Step 1: Create & configure a webpack compiler
  var webpack = require('webpack');
  var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config');
  var compiler = webpack(webpackConfig);

  // Step 2: Attach the dev middleware to the compiler & the server
  app.use(require('webpack-dev-middleware')(compiler, {
    logLevel: 'warn', publicPath: webpackConfig.output.publicPath
  }));

  // Step 3: Attach the hot middleware to the compiler & the server
  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));
})();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/foods', require('./routes/api/foods'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
