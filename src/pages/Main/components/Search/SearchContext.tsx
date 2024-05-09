import {createContext, useContext, useState} from "react";
type SearchContextType = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
export const SearchContext = createContext({});

export function ProvideSearchContext({children}) {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <SearchContext.Provider
      value={{searchValue, setSearchValue, currentPage, setCurrentPage}}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = (): SearchContextType => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  return useContext(SearchContext);
};
