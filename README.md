Discoteca
=========

> Jukebox web app powered by Spotify

Discoteca is a jukebox server that handles searching and adding songs. At the Goodybag.com office
we installed speakers, so Discoteca powers our music system.

The interface actually just talks to the spotify client via applescript, so you will need to run the client while Discoteca
is live.

Prequisites
-----------

* Spotify premium subscription
* Spotify OSX client
* node.js

Install
-------

```shell
git clone ---
npm install
```

Configure
---------

Customize options in `config.json`

Run
-------

```shell
npm start
```

By default, the server will begin to listen on port 4000.

Screenshots
-----------

![Song list](http://i.imgur.com/d2ooG2B.png)

![Search](http://i.imgur.com/ExMlNOh.png)


License
-------

MIT
