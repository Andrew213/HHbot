import { Box, IconButton, TextField, Typography } from '@mui/material';
import useAction from 'client/hooks/useAction';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useSearch } from './SearchContext';
import { useSearchParams } from 'react-router-dom';
import { useTypedSelector } from 'client/hooks/useTypedSelector';
import { useState } from 'react';

const Search: React.FC = () => {
    const { searchValue, setSearchValue, setCurrentPage } = useSearch();

    const { found } = useTypedSelector(state => state.Vacancies);

    const { searchAllVacancies, getSimilarVacancies } = useAction();

    const [searchParams] = useSearchParams();

    const [wasFound, setWasFound] = useState<boolean>(false);

    const handleOnSearch = () => {
        if (searchValue) {
            setWasFound(true);
            searchAllVacancies(searchValue.trim(), 0);
        } else if (searchParams.has('resume')) {
            setWasFound(false);
            getSimilarVacancies(searchParams.get('resume') as string, 0);
        }
        setCurrentPage(1);
    };

    const handleOnClear = () => {
        setWasFound(false);
        setSearchValue('');
        getSimilarVacancies(searchParams.get('resume') as string, 0);
        setCurrentPage(1);
    };

    return (
        <>
            <Box sx={{ position: 'relative' }}>
                <TextField
                    fullWidth
                    placeholder="Поиск"
                    value={searchValue}
                    onChange={e => {
                        setSearchValue(e.target.value);
                    }}
                    inputProps={{
                        'aria-label': 'search google maps'
                    }}
                    sx={{}}
                    InputProps={{
                        style: {
                            paddingRight: '50px'
                        }
                    }}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleOnSearch();
                        }
                    }}
                />
                {searchValue && (
                    <IconButton
                        type="button"
                        sx={{
                            position: 'absolute',
                            right: 35,
                            top: '50%',
                            transform: 'translateY(-50%)'
                        }}
                        aria-label="search"
                        onClick={handleOnClear}
                        size="small"
                    >
                        <ClearIcon fontSize="inherit" />
                    </IconButton>
                )}

                <IconButton
                    type="button"
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)'
                    }}
                    aria-label="search"
                    onClick={handleOnSearch}
                >
                    <SearchIcon />
                </IconButton>
            </Box>
            {searchValue && found && wasFound && (
                <Typography mt={1}>{`Найдено ${found} вакансий`}</Typography>
            )}
        </>
    );
};

export default Search;
