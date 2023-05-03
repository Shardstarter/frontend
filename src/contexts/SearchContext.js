import React, { useState, createContext } from "react";

export const SearchContext = createContext();

export const SearchProvider = (props) => {
  const [search, setSearch] = useState(null);
  const [chain, setChain] = useState("all");
  const [filter, setFilter] = useState("none");
  const [sort, setSort] = useState("default");
  return (
    <SearchContext.Provider
      value={
        [search, setSearch, chain, setChain, filter, setFilter, sort, setSort]
      }
    >
      {props.children}
    </SearchContext.Provider>
  );
};
