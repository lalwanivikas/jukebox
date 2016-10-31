import React, { Component } from 'react';
import SongsList from './components/SongsList/SongsList';
import Player from './components/Player/Player';
import fetchSongs from './fetchSongs.js';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      currentSong: 0
    }
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleSongClick = this.handleSongClick.bind(this);
  }

  componentWillMount(){
    fetchSongs()
      .then(songs => this.setState({songs: songs}))
      .catch(err => console.log(err));
  }

  handlePrev() {
    // console.log("prev clicked");
    const nextSong = parseInt(this.state.currentSong, 10) - 1;
    if(this.state.currentSong > 0) {
      this.setState({currentSong: nextSong});
    }
  }

  handleNext() {
    const nextSong = parseInt(this.state.currentSong, 10) + 1;
    if(this.state.currentSong < this.state.songs.length - 1) {
      this.setState({currentSong: nextSong});
    }
  }

  handleSongClick(id) {
    this.setState({currentSong: id});
  }

  render() {
    return (
      <div>
        <div className='container'>
          <h1 className="title">Jukebox</h1>
          <SongsList
            songs={this.state.songs}
            currentSongNumber={this.state.currentSong}
            handleSongClick={this.handleSongClick}
          />
        </div>
        {
          this.state.songs.length
            ? <Player
                currentSongUrl={this.state.songs[this.state.currentSong].song_url}
                currentSongTitle={this.state.songs[this.state.currentSong].song_title}
                playPrev={this.handlePrev}
                playNext={this.handleNext}
              />
            : null
        }
      </div>
    );
  }
}

export default App;