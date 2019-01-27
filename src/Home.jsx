import React, { Component } from "react";
import Search from "./Search";
import { SearchContextProvider } from "./contexts/SearchContext";
import SongList from "./SongList";
import { SongContextProvider } from "./contexts/SongContext";
import Player from "./Player";
import Loader from "./Loader";
const fetchData = async (query = "") => {
  const stream = await fetch(
    `https://cors.io/?https://itunes.apple.com/search?term=${encodeURI(query)}`
  );
  return await stream.json();
};
export default class Home extends Component {
  state = { query: undefined, song: null };
  updateQuery = async query => {
    this.setState(
      {
        isLoading: true
      },
      async () => {
        const { results } = await fetchData(query);
        this.setState({
          query,
          songs: results,
          isLoading: false
        });
      }
    );
  };
  selectSong = song => {
    this.setState({
      song
    });
  };
  exitPlayer = () => {
    this.setState({
      song: null
    });
  };
  render() {
    let SongListOrPlayer = !this.state.song ? (
      this.state.isLoading ? <Loader /> : <SongList onSelectSong={this.selectSong} />
    ) : (
      <Player onBack={this.exitPlayer} />
    );
    const disableButton = !this.state.song;
    return (
      <div>
        <button
          className="back"
          disabled={disableButton}
          onClick={this.exitPlayer}
        >
          Back
        </button>
        <Search onSubmit={this.updateQuery} />
        <SearchContextProvider value={this.state.songs}>
          <SongContextProvider value={this.state.song}>
            {SongListOrPlayer}
          </SongContextProvider>
        </SearchContextProvider>
      </div>
    );
  }
}
