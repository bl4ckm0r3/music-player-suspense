import React from "react";

const SongContext = React.createContext();

export const SongContextProvider = SongContext.Provider;

export const SongContextConsumer = SongContext.Consumer;