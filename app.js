var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var spotify = require('spotify-node-applescript');
var routes = require('./routes/index');
var config = require('./config');
var app = express();
var server = require('http').Server(app);
server.listen(process.env.PORT || 4000);
var io = require('socket.io')(server);
var qs = require('qs');
var dio = require('./dio')(io);
var request = require('request');
var jukebox = require('./lib/jukebox');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.get('/callback', function(req, res) {
  var code = req.query.code || null;
  var state = req.query.state || null;
});

app.get('/playpause', function(req, res) {
  spotify.playPause(function() {
    console.log(arguments);
    res.send('play/pause spotify');
  });
});

app.get('/enqueue', function(req, res) {
  jukebox.enqueue(req.query);
  console.log(req.query);
  res.redirect('/');
});

app.get('/playTrack/:trackId', function(req, res) {
  var id = 'spotify:track:' + req.params.trackId;
  console.log('trying to play ', id);
  spotify.playTrack(id, function(err) {
    if (err) res.send('404');
    res.send('playing ' + id);
  });
});

app.get('/search/:query', function(req, res) {
  var url = 'https://api.spotify.com/v1/search?' +
    qs.stringify({
      q: req.params.query,
      type: 'track'
    });
  request.get(url).pipe(res);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
