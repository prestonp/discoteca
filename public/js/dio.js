var tm = require('title-marquee');
//var socket = io.connect('http://preston.local:4000/');
var socket = io.connect('http://localhost:4000');
var $queueList = $('.section-queue tbody');

var pad = function(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

var $info = $('.current .info');
var $time = $('.current .time');
var $album = $('.current .album');
var $stats = $('.stats');

tm({ text: '              ', type: 'bounce' });

socket.on('current', function (current) {
  var time = '';
  var duration = {
    min: Math.floor(current.track.duration / 60)
  , sec: pad(current.track.duration % 60, 2)
  };
  var position = {
    min: Math.floor(current.state.position / 60)
  , sec: pad(current.state.position % 60, 2)
  };
  if (current.img){
    $album.attr('src', current.img);
  }
  var infoTxt = current.track.name + ' - ' + current.track.artist;
  var timeTxt = position.min + ':' + position.sec + '/' + duration.min + ':' + duration.sec;
  $info.html(infoTxt);
  $time.html(timeTxt);
  tm.text(infoTxt + ' ' + timeTxt);
});

socket.on('queue:list', function(queue) {
  queue = queue.slice(1).map(function(track) {
    return [
    '<tr>',
    '<td>' + track.name + '</td>',
    '<td>' + track.artists + '</td>',
    '<td>' + track.min + ':' + track.sec + '</td>',
    '</tr>'
    ].join('');
  }).join('\n');

  $queueList.html(queue);
});

socket.on('listeners', function(count) {
  $stats.html(count + (count === 1 ? ' listener' : ' listeners'));
});
