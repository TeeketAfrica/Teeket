import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(null);

  const clearSearch = () => {
    setSearchTerm("");
    setCategory(null);
  };

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, category, setCategory, clearSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
