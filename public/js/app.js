var $searchInput = $('.search-input');
var $searchResults = $('.section-search tbody');

var pad = function(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function queueBtn(r, duration, artists) {
  console.log('ALBUM', r.album.images[0].url);
  var output = [
    '<form method="get" action="enqueue" class="form-queue">',
    '<input type="hidden" name="name" value="'+r.name+'">',
    '<input type="hidden" name="artists" value="' + artists + '">',
    '<input type="hidden" name="uri" value="' + r.uri + '">',
    '<input type="hidden" name="img" value="' + r.album.images[0].url + '">',
    '<input type="hidden" name="min" value="' + duration.min + '">',
    '<input type="hidden" name="sec" value="' + duration.sec + '">',
    '<button type="submit" class="btn-queue">Queue</button>',
    '</form>'
  ].join('\n');
  return output;
}

function showResults(results) {
  results = results.tracks.items.map(function(r) {
    var name = r.name;
    var duration = {
      min: Math.floor(r.duration_ms / (60 * 1000 ))
    , sec: pad(Math.floor((r.duration_ms / 1000))%60, 2)
    };
    var artists = r.artists.map(function(a) {
      return a.name;
    }).join(', ');
    console.log(r);
    return [
      '<tr>',
      '<td>' + name + '</td>',
      '<td>' + artists + '</td>',
      '<td>' + duration.min + ':' + duration.sec + '</td>',
      '<td>' + queueBtn(r, duration, artists) + '</td>',
      '</tr>'
    ].join('');
  });
  $searchResults.html(results);
}

$('.form-search').submit(function(e) {
  e.preventDefault();
  $.ajax({
    url: '/search/' + $searchInput.val()
  })
  .done(function(results) {
    showResults(results);
  })
  .fail(function() {
    console.log('shit failed', arguments);
  });
});

$('nav a').click(function() {
  var $this = $(this);

  $sections = $('section').addClass('hide');
  $links = $('nav a').removeClass('active');

  $this.addClass('active');
  var $target = $( '.' + $this.data('toggle')).removeClass('hide');
});
