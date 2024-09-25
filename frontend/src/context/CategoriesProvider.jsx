import { createContext, useState } from "react";
export const CategoriesStore = createContext({});
const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <CategoriesStore.Provider
      value={{ categories, setCategories, selectedCategories, setSelectedCategories }}
    >
      {children}
    </CategoriesStore.Provider>
  );
};

export default CategoriesProvider;
