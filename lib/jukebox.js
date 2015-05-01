var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Jukebox = function(options) {
  options = options || {};
  this.clear();
  this.spotify = options.spotify || require('./spotify');
  this.spotify.player.on({
    endOfTrack: this.dequeue.bind(this)
  });
};

util.inherits(Jukebox, EventEmitter);

Jukebox.prototype.enqueue = function(trackLink) {
  var track = this.spotify.createFromLink(trackLink);
  var length = this.queue.push(track);
  this.emit('queued', track);

  if ( length === 1) {
    this.playCurrent();
  }

  return this;
};

Jukebox.prototype.current = function() {
  return {
    track: this.queue[0]
  , currentSecond: this.spotify.player.currentSecond
  };
};

Jukebox.prototype.playCurrent = function() {
  if (this.queue.length)
    this.spotify.player.play(this.queue[0]);
  return this;
};

Jukebox.prototype.get = function() {
  return this.queue;
};

Jukebox.prototype.tail = function() {
  return this.queue.slice(1);
};

Jukebox.prototype.dequeue = function() {
  var current = this.queue.shift();
  this.emit('dequeued', current);
  this.playCurrent();
  return this;
};

Jukebox.prototype.clear = function() {
  this.queue = [];
  return this;
};

Jukebox.prototype.search = function(query, callback) {
  var search = new this.spotify.Search(query);
  search.execute(function searchCb(err, result) {
    if (err) return callback(err);
    return callback(null, result.tracks);
  });
  return this;
};

module.exports = Jukebox;
