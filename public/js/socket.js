var path = require('./path');
var socket = io.connect(path.baseUrl + ':' + path.port);

module.exports = socket;
