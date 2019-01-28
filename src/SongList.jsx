import React, { Component } from "react";
import { SearchContextConsumer } from "./contexts/SearchContext";
import { asyncComponent } from "./util";

const Song = asyncComponent(() => import("./Song").then(mod => mod.default));

export default class SongList extends Component {
  render() {
    return (
      <div className="songlist">
        <SearchContextConsumer>
          {(songs = []) =>
            songs.map(song => (
              <Song
                key={`${song.trackId}${song.collectionId}`}
                onSelectSong={this.props.onSelectSong}
                song={song}
              />
            ))
          }
        </SearchContextConsumer>
      </div>
    );
  }
}
