import React, { Component } from 'react';

import './SongsList.css';

class SongsList extends Component {
  render() {
    return (
      <div className="songs-list">
        {
         this.props.songs.map((song, i) => {
            return <div
                      key={i}
                      id={i}
                      className={parseInt(this.props.currentSongNumber, 10) === i ? "song-list-item glow" : "song-list-item"}
                      onClick={(e) => this.props.handleSongClick(e.target.id)}>
                      {song.song_title.slice(0, -4)}
                    </div>
          })
        }
      </div>
    );
  }
}

export default SongsList;