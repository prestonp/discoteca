// dio.js handles discoteca socket io
var async = require('async');
var Jukebox = require('./jukebox');
var jukebox = new Jukebox();

var connected = function(io) {
  var ns = io.of('/'); // default namespace is '/'
  var connected = ns.connected;
  return connected;
};

var connectedLength = function(io) {
  return Object.keys(connected(io)).length;
};

var update = function(io) {
  io.emit('current', jukebox.current());
};

var handler = function(io) {
  setInterval(update.bind(null, io), 500);

  jukebox.on('queued', function(track) {
    console.log('Queue:', track);
    io.emit('queue:list', jukebox.tail());
  });

  jukebox.on('dequeued', function(track) {
    console.log('Dequeue:', track);
    io.emit('queue:list', jukebox.tail());
  });

  jukebox.on('covers:update', function() {
    io.emit('covers', jukebox.getCurrentCovers());
  });


  io.on('connection', function (socket) {
    console.log('Client connected');

    // init clients
    io.emit('queue:list', jukebox.tail());
    io.emit('listeners', connectedLength(io));
    io.emit('covers', jukebox.getCurrentCovers());

    // other events
    socket.on('disconnect', function() {
      io.emit('listeners', connectedLength(io));
    });

    socket.on('search', function(query) {
      jukebox.search(query, function(err, tracks) {
        if ( err ) throw new Error('Unable to search');
        socket.emit('search-response', tracks);
      });
    });

    socket.on('enqueue', function(trackLink) {
      jukebox.enqueue(trackLink);
    });
  });
};

module.exports = handler;
