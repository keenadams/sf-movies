'use strict';

const Util = require('util');

const Config = require('../config');
const Movies = require('../lib/server.js');

Movies.start(() => {
  Util.log(`Server started on port: ${Config.PORT}`);
});
