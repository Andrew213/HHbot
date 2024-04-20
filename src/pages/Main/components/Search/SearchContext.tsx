import { createContext, useContext, useState } from 'react';

export const SearchContext = createContext<any>([]);

export function ProvideSearchContext({ children }) {
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    return (
        <SearchContext.Provider
            value={{ searchValue, setSearchValue, currentPage, setCurrentPage }}
        >
            {children}
        </SearchContext.Provider>
    );
}

type SearchContextType = {
    searchValue: string;
    setSearchValue: (value: string) => void;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const useSearch = (): SearchContextType => {
    return useContext(SearchContext);
};
