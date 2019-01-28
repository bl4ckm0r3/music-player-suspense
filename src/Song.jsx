import React from "react";
import { getHighResImage } from "./util";

const Image = React.lazy(() => import("./Image"));

export default function Song(props) {
  return (
    <div className="song" onClick={() => props.onSelectSong(props.song)}>
      <Image
        alt={props.song.trackName}
        className="cover"
        src={getHighResImage(props.song.artworkUrl100)}
      />
      <div className="album"><p>{props.song.collectionName}</p></div>
      <div className="artist"><p>{props.song.artistName}</p></div>
      <div className="track"><p>{props.song.trackName}</p></div>
    </div>
  );
}
