import { createContext, useState } from "react";
export const SearchStore = createContext({});
const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState('');


  return (
    <SearchStore.Provider value={{ search, setSearch }}>
      {children}
    </SearchStore.Provider>
  );
};

export default SearchProvider;
