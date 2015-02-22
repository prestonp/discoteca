var EventEmitter = require('events').EventEmitter;
var util = require('util');


var Jukebox = function(options) {
  this.clear();
};

util.inherits(Jukebox, EventEmitter);

Jukebox.prototype.enqueue = function(track) {
  this.queue.push(track);
  this.emit('queued', track);
  return this;
};

Jukebox.prototype.current = function() {
  return this.queue[0];
}

Jukebox.prototype.get = function() {
  return this.queue;
};

Jukebox.prototype.tail = function() {
  return this.queue.slice(1);
};

Jukebox.prototype.dequeue = function() {
  var current = this.queue.shift();
  this.emit('current', current);
  return current;
};

Jukebox.prototype.clear = function() {
  this.queue = [];
};
module.exports = new Jukebox();
