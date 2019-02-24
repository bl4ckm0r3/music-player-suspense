import React, { Component, Suspense } from "react";
import { SearchContextProvider } from "./contexts/SearchContext";

import { SongContextProvider } from "./contexts/SongContext";
import Loader from "./Loader";
import { unstable_createResource as createResource } from "react-cache";

const SongList = React.lazy(() => import("./SongList"));

const Player = React.lazy(() => import("./Player"));
const Search = React.lazy(() => import("./Search"));

const DataResource = createResource(async query => {
  if (!query) return Promise.resolve([]);
  const stream = await fetch(
    `https://cors.io/?https://itunes.apple.com/search?term=${encodeURI(query)}`
  );
  const { results: songs = [] } = await stream.json();
  return songs;
});
export default class Home extends Component {
  state = { query: undefined, song: null };
  updateQuery = async query => {
    this.setState({
      query
    });
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
      <SongList onSelectSong={this.selectSong} />
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
        <SearchContextProvider value={DataResource.read(this.state.query)}>
          <SongContextProvider value={this.state.song}>
            <Suspense fallback={<Loader />}>{SongListOrPlayer}</Suspense>
          </SongContextProvider>
        </SearchContextProvider>
      </div>
    );
  }
}
