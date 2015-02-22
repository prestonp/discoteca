// handles discoteca socket io
var spotify = require('spotify-node-applescript');
var async = require('async');
var jukebox = require('./lib/jukebox');
var playing;

var playCurrent = function() {
  var current = jukebox.current();
  if ( current ) {
    spotify.playTrack(current.uri, function() {});
    playing = true;
  }
};

var connected = function(io) {
  // Default namespace is '/'
  var ns = io.of('/');
  var connected = ns.connected;
  return connected;
};

var connectedLength = function(io) {
  return Object.keys(connected(io)).length;
}

var updateClient = function(io) {
  return function update() {
    async.parallel({
      state: spotify.getState,
      track: spotify.getTrack
    }, function done(err, result) {
      if (err) return console.error('Error: ' + err + err.stack);

      var queue = jukebox.get();

      // pause if empty
      if (!queue.length) {
        playing = false;
        //spotify.pause();
      }

      // play song if queue is populated
      if (queue.length && !playing) {
        playCurrent();
      }

      // play next song if current is done
      if (result.state.position >= result.track.duration-1) {
        jukebox.dequeue();
        playCurrent();
        io.emit('queue:list', jukebox.get());
      }

      var current = jukebox.current();
      if ( current ) {
        result.img = current.img;
      }

      //if (playing) {
      io.emit('current', result);
      //}
    });
  };
}


var handler = function(io) {
  setInterval(updateClient(io), 500);
  io.on('connection', function (socket) {
    console.log('client connected');

    // handle # of listeners
    socket.on('disconnect', function() {
      io.emit('listeners', connectedLength(io));
    });
    io.emit('listeners', connectedLength(io));

    // init current queue
    io.emit('queue:list', jukebox.get());
  });
};

module.exports = handler;
