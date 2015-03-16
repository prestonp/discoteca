var utils = {
  getMinute: function(duration) {
    return Math.floor(duration / 60);
  },

  getSecond: function(duration) {
    return utils.pad(duration%60, 2)
  },

  parseTime: function(time) {
    return { min: utils.getMinute(time), sec: utils.getSecond(time) };
  },

  pad: function(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  },

  artists: function(track) {
    return track.artists.map(function(artist) {
      return artist.name;
    }).join(', ');
  }
};

module.exports = utils;
