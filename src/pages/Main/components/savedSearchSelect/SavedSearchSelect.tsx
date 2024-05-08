import { api } from '@/api';
import Spiner from '@/components/error-boundry/Spiner';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

type savedSearch = {
    id: string;
    name: string;
    url: string;
};

type SavedSearchSelectT = {
    disabled?: boolean;
    defaultValue?: savedSearch;
};

const SavedSearchSelect: React.FC<SavedSearchSelectT> = ({
    disabled,
    defaultValue
}) => {
    const [savedSearches, setSavedSearches] = useState<savedSearch[]>();

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const getSaveSearches = async () => {
            setLoading(true);
            const response = await api.get('/api/saved_search');
            if (response.status === 200 && response.data?.found) {
                setSavedSearches(
                    response.data.items.map(el => ({
                        id: el.id,
                        name: el.name,
                        url: el.items.url
                    }))
                );
            }
            setLoading(false);
        };
        if (open && !savedSearches?.length) {
            getSaveSearches();
        }
    }, [open, disabled, savedSearches]);

    return (
        <Autocomplete
            getOptionLabel={option => option.name}
            options={savedSearches || []}
            onChange={(event: any, savedSearch: savedSearch) => {
                dispatch({ type: 'GET_SAVED_SEARCH', savedSearch });
            }}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            defaultValue={defaultValue}
            noOptionsText={
                <Button
                    href="https://hh.ru/applicant/autosearch?hhtmFrom=vacancy_search_list"
                    target="_blank"
                >
                    Добавить автопоиск
                </Button>
            }
            loadingText="Загрузка"
            disabled={disabled}
            loading={loading}
            renderInput={params => (
                <TextField
                    label="Сохранённый поиск"
                    margin="normal"
                    {...params}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                <Button
                                    size="small"
                                    variant="text"
                                    target="_blank"
                                    href="https://hh.ru/article/14"
                                >
                                    Подробнее
                                </Button>
                                {params.InputProps.endAdornment}
                            </>
                        )
                    }}
                />
            )}
        />
    );
};

export default SavedSearchSelect;
