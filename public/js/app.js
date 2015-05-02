var socket = require('./socket');
var View = require('./view');

var view = new View();

socket.on('current', view.onCurrentUpdate.bind(view));
socket.on('queue:list', view.onQueueList.bind(view));
socket.on('listeners', view.onListeners.bind(view));
socket.on('search-response', view.onSearchResponse.bind(view));
socket.on('covers', view.onCoverUpdate.bind(view));

view.on('search', socket.emit.bind(socket, 'search'));
view.on('enqueue', socket.emit.bind(socket, 'enqueue'));
