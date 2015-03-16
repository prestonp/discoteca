var assert = require("assert")
var noop = function() {};
var identity = function(x) { return x; };

// mocked spotify
var spotify = {
  player: { on: noop }
, createFromLink: identity
};

var Jukebox = require('../lib/jukebox');
var jukebox = new Jukebox({ spotify: spotify });

describe('lib/jukebox.js', function(){
  it('should return queue', function() {
    assert(Array.isArray(jukebox.get()));
  });

  it('should enqueue track', function() {
    jukebox.clear();
    jukebox.enqueue('fake-track-link');
    assert(jukebox.get().length);
  });
})
