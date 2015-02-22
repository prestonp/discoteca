var assert = require("assert")
var jukebox = require('../lib/jukebox');

describe('Jukebox', function(){
  describe('client controller', function(){
    it('should return queue', function() {
      assert(Array.isArray(jukebox.get()));
    });
    it('play', function(){
      assert(false);
    });

    it('pause', function() {
      assert(false);
    });
  });

  describe('web api', function() {
    it('search track', function() {
      assert(false);
    });

    it('enqueue track', function() {
      jukebox.enqueue({ });
      var queue = jukebox.get();
      assert(queue.length);
    });
  });

  describe('actions', function() {
    it('skip current track', function() {
      assert(false);
    });
  });
})
