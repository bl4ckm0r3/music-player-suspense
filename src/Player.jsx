import React, { Component } from "react";
import { SongContextConsumer } from "./contexts/SongContext";
import { getHighResImage } from "./util";

export default class Player extends Component {
  state = {};
  lazyLoadBackgroundImage = song => {
    const bg = getHighResImage(song.artworkUrl100, 1200);
    this.image = new Image();
    this.image.onload = () => this.setState({ bg });
    this.image.src = bg;
  };

  getStyle = song => {
    if (this.state.bg) {
      return { backgroundImage: `url(${this.state.bg})` };
    }
    this.lazyLoadBackgroundImage(song);
  };
  componentWillUnmount() {
    this.image.onload = () => {};
    this.image = null;
  }
  render() {
    const classes = `player fullscreen-bg ${!!this.state.bg && "loaded"}`;
    return (
      <SongContextConsumer>
        {song => (
          <div className={classes} style={this.getStyle(song)}>
            <figure className="audio-player">
              <figcaption className="caption">{song.trackName}</figcaption>
              <audio controls src={song.previewUrl}>
                Your browser does not support the
                <code>audio</code> element.
              </audio>
            </figure>
          </div>
        )}
      </SongContextConsumer>
    );
  }
}
