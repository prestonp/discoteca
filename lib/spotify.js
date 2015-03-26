var config = require('../config');
var spotify = require('spotify')(config.libspotify);

spotify.login(config.user, config.password, config.remember, config.useRemembered);

module.exports = spotify;
