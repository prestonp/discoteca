var config = require('../config');
var spotify = require('spotify')(config.libspotify);
var request = require('request');
var albumPath = 'https://api.spotify.com/v1/albums/';

spotify.login(config.user, config.password, config.remember, config.useRemembered);

spotify.getAlbumArt = function(album, callback) {
  var data = { url: albumPath + album.link.split(':')[2], json: true };
  request(data, function (error, response, body) {
    if (error) return callback(error);
    callback(error, body.images);
  });
};

module.exports = spotify;
