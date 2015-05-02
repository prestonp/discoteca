var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');
var utils = require('./utils');
var tm = require('title-marquee');

inherits(View, EventEmitter);
module.exports = View;

function View(opts) {
  opts = opts || {};

  // Listener stats
  this.$stats = $(opts.$stats || '.stats');

  // Search form
  this.$search = $(opts.$search || '.form-search');
  this.$search.submit(this.onSearch.bind(this));
  this.$searchInput = $(opts.$searchInput || '.search-input');
  this.$searchResults = $(opts.$searchResults || '.section-search tbody');

  // Current Playing
  this.$info = $(opts.$info || '.current .info');
  this.$time = $(opts.$time || '.current .time');

  // Tabs
  this.$tabs = $(opts.$tabs || 'nav a');
  this.$tabs.click(this.onTabClick);

  // Queue
  this.$queueList = $(opts.$queueList || '.section-queue tbody');

  // Init title scrolling
  tm({ text: '              ' });
};

View.prototype.onListeners = function(count) {
  this.$stats.html(count + (count === 1 ? ' listener' : ' listeners'));
};

View.prototype.onSearch = function(e) {
  e.preventDefault();
  this.emit('search', this.$searchInput.val());
};

View.prototype.onTabClick = function(e) {
  e.preventDefault();
  var $this = $(this);

  // Update tabs
  var $links = $('nav a').removeClass('active');
  $this.addClass('active');

  // Update main
  if ($this.data('toggle') === 'section-search')
    $('main').addClass('flip');
  else
    $('main').removeClass('flip');
};


View.prototype.onSearchResponse = function(tracks) {
  var _this = this;

  tracks = tracks.map(function(t) {
    var duration = utils.parseTime(t.duration);
    var artists = t.artists.map(function(a) {
      return a.name;
    }).join(', ');

    return [
      '<tr>',
      '<td>' + t.name + '</td>',
      '<td>' + artists + '</td>',
      '<td>' + duration.min + ':' + duration.sec + '</td>',
      '<td><button type="submit" class="btn-queue" data-link="' + t.link + '">Queue</button></td>',
      '</tr>'
    ].join('');
  });

  this.$searchResults.html(tracks);

  // todo: refactor this crap
  $('.btn-queue').on('click', function(e) {
    $btn = $(e.target);
    $btn.prop('disabled', true).html('Queued');
     _this.emit('enqueue', $btn.data('link'));
  });
};

View.prototype.onCurrentUpdate = function(current) {
  if ( !current || !current.track ) return;
  var duration = utils.parseTime(current.track.duration);
  var position = utils.parseTime(current.currentSecond);
  var artists = current.track.artists.map(function(artist) {
    return artist.name;
  }).join(', ');

  var infoTxt = current.track.name + ' - ' + artists;
  var timeTxt = position.min + ':' + position.sec + '/' + duration.min + ':' + duration.sec;
  this.$info.html(infoTxt);
  this.$time.html(timeTxt);
  this.setTitle(infoTxt + ' ' + timeTxt);
};

View.prototype.onQueueList = function(queue) {
  queue = queue.map(function(track) {
    var duration = utils.parseTime(track.duration);
    var artists = utils.artists(track);

    return [
    '<tr>',
    '<td>' + track.name + '</td>',
    '<td>' + artists + '</td>',
    '<td>' + duration.min + ':' + duration.sec + '</td>',
    '</tr>'
    ].join('');
  }).join('\n');

  this.$queueList.html(queue);
};

View.prototype.onCoverUpdate = function(covers) {
  if (covers.length) {
    covers.sort(function smallerHeight(a, b) {
      return a.height - b.height;
    });
    $('.album').prop('src', covers[0].url);
  }
};

View.prototype.setTitle = function(text) {
  tm.text(text);
};
