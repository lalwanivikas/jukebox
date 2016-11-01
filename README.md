# Jukebox
####Music player built in React

![jukebox screenshot](http://i.imgur.com/gXwztsK.png)

## Features

* Displays list of `.mp3` files in your folder
* Will play all the songs in the order displayed
* You can jump to any song by clicking on it
* Displays current time and total duration of the file being played
* Play previous or next song
* Loop through a song infinitely
* Mute/unmute the volume
* Highlights the song currently being played. Also lists the same at the bottom of the screen


## Setting it up on your machine

### Server
- Serve files from your local folder at `http://localhost:9000/`. (I know I know! I will fix it. Have to add many more things)
- You might get CORS error if you are using Python's SimpleHTTPServer. I suggest you install [http-server](https://github.com/indexzero/http-server) via npm. Then `cd` into your folder with `.mp3` files and run `http-server -a localhost -p 9000 --cors`
- Right now just it will only run `.mp3` files. So just keep those in your folder.

### Client
- It is bootstrapped with [create-react-app](https://github.com/facebookincubator/create-react-app)
- Once your local server is up, `cd` into the project folder. Now first run `npm install` to install dependencies and then run `npm start`


#### Enjoy!