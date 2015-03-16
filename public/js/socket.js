var config = require('./config');
var socket = io.connect(config.path);

module.exports = socket;
