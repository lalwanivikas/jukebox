import React, { Component } from 'react';

import './Player.css'

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentSongUrl: "",
      currentSongTitle: "",
      isPlaying: false,
      isMute: false,
      currentTime: 0,
      duration: 0,
      isLooping: false
    }
    this.handlePlay = this.handlePlay.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.handleSlider = this.handleSlider.bind(this);
    this.handleLooping = this.handleLooping.bind(this);
  }

  handlePlay() {
    this.state.isPlaying ? this.refs.player.pause() : this.refs.player.play();
    this.setState({isPlaying: !this.state.isPlaying});
  }

  handleVolume() {
    this.setState({isMute: !this.state.isMute})
  }

  handleTime() {
    const audio = this.refs.player;
    let timer;
    if(timer){window.cancelRequestAnimFrame(timer)};
    if(audio) {
      timer = window.requestAnimationFrame(() => {
        this.setState({
          currentTime: audio.currentTime,
          duration: audio.duration
        });
        if(Math.floor(audio.currentTime) === Math.floor(audio.duration)) {
          if(this.state.isLooping) {
            this.refs.player.currentTime = 0;
            this.refs.player.play();
          } else {
            this.props.playNext();
          }
        }
      });
    }
  }

  handleSlider(event) {
    this.refs.player.currentTime = event.target.value;
    this.setState({currentTime: event.target.value});
  }

  handleLooping() {
    this.setState({isLooping: !this.state.isLooping});
  }

  componentWillMount() {
    this.setState({
      currentSongUrl: this.props.currentSongUrl,
      currentSongTitle: this.props.currentSongTitle
    });
  }

  componentDidMount() {
    this.handleTime();
  }

  componentDidUpdate() {
    this.handleTime();
  }

  componentWillReceiveProps(nextProps) {
    // console.log("receiving ", nextProps.currentSongUrl);
    this.setState({
      currentSongUrl: nextProps.currentSongUrl,
      currentSongTitle: nextProps.currentSongTitle,
      isPlaying: true
    });
  }

  render() {
    return (
      <div className="player-controls">

        <div className="icons-container">

          <i
            className={this.state.isLooping ? "material-icons repeat glow" : "material-icons repeat"}
            onClick={this.handleLooping}>repeat_one
          </i>

          <i className="material-icons" onClick={this.props.playPrev}>skip_previous</i>

          <i
            className="material-icons play"
            ref="play"
            onClick={this.handlePlay}>
            {this.state.isPlaying ? "pause_circle_outline" : "play_circle_outline"}
          </i>

          <i className="material-icons" onClick={this.props.playNext}>skip_next</i>

          <i
            className="material-icons volume"
            ref="volume"
            onClick={this.handleVolume}>
            {this.state.isMute ? "volume_off" : "volume_up"}
          </i>
        </div>

        <audio
          src={this.state.currentSongUrl}
          ref="player"
          muted={this.state.isMute}
          autoPlay={this.state.isPlaying}>Your browser does not support the <code>audio</code> element.
        </audio>

        <div>
          <div className="time" ref='currentTime'>{convertSecondsToMinsSecs(this.state.currentTime)}</div>
          <input
            className='slider'
            type="range"
            min="0"
            step="1"
            max={this.state.duration}
            value={this.state.currentTime}
            onChange={this.handleSlider}
          />
          <div className="time" ref='duration'>{convertSecondsToMinsSecs(this.state.duration)}</div>
          <div className="song-title">{this.state.currentSongTitle.slice(0, -4)}</div>
        </div>
      </div>
    );
  }
}

export default Player;

function convertSecondsToMinsSecs(totalSec) {
  const minutes = parseInt( totalSec / 60, 10) % 60;
  const seconds = parseInt(totalSec % 60, 10);
  const result = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
  return result;
}