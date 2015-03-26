Discoteca
=========

> Jukebox web app powered by Spotify


Prequisites
-----------

* Spotify premium subscription and application key **(spotify_appkey.key)**
* node.js
* libspotify

Download libspotify
-------------------

Get libspotify
```
brew install homebrew/binary/libspotify
```

In case you need xcode command line tools:

```
xcode-select --install
```

Install
-------

```shell
git clone https://github.com/prestonp/discoteca.git
npm install
```

Configure
---------

```shell
cp config.js.sample config.js
```

Then replace credentials and server setup options.

Run
-------

```shell
npm start
```

By default, the server will listen on http://localhost:4000.

Screenshots
-----------

![Song list](http://i.imgur.com/d2ooG2B.png)

![Search](http://i.imgur.com/ExMlNOh.png)


License
-------

MIT
