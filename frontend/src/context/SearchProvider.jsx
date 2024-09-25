import { createContext, useState } from "react";
export const SearchStore = createContext({});
const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState('');
 const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <SearchStore.Provider
      value={{ search, setSearch, selectedCategories, setSelectedCategories }}
    >
      {children}
    </SearchStore.Provider>
  );
};

export default SearchProvider;
