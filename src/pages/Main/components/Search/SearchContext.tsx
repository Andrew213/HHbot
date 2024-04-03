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

export const useSearch = () => {
    return useContext(SearchContext);
};
