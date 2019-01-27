import React from "react";

const SearchContext = React.createContext({
    query: null
});

export const SearchContextProvider = SearchContext.Provider;

export const SearchContextConsumer = SearchContext.Consumer;