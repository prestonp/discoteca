var spotify = require('./lib/spotify');

spotify.on({
  ready: function(err) {
    if (err) { throw new Error('Unable to login to spotify: ', err); }
    console.log('Logged in! Starting application..');
    require('./app');
  }
});

console.log('Logging into spotify');
