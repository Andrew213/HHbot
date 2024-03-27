import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import useAction from 'client/hooks/useAction';
import { useTypedSelector } from 'client/hooks/useTypedSelector';
import { memo, useEffect } from 'react';
import VacancyItem from '../VacancyItem/VacancyItem';
import Spiner from 'client/components/error-boundry/Spiner';
import { Box, Icon } from '@mui/material';
import { useSearch } from '../Search/SearchContext';

const VacanciesList: React.FC<{
    message: string;
    resume_id: string;
    search_value: string;
}> = ({ message, resume_id }) => {
    const { loading, items, pages, found } = useTypedSelector(
        state => state.Vacancies
    );

    const { searchValue, currentPage, setCurrentPage } = useSearch();

    const { getSimilarVacancies, searchAllVacancies } = useAction();

    useEffect(() => {
        if (resume_id) {
            getSimilarVacancies(resume_id, 0);
        }
    }, [resume_id]);

    const isItemLoaded = index => !!items[index];

    const loadMoreItems = (startIndex, stopIndex) => {
        if (currentPage <= pages) {
            if (searchValue) {
                searchAllVacancies(searchValue, currentPage);
            } else if (resume_id) {
                getSimilarVacancies(resume_id, currentPage);
            }
            setCurrentPage(prev => prev + 1);
        }

        return new Promise<void>(resolve =>
            setTimeout(() => {
                for (let index = startIndex; index <= stopIndex; index++) {
                    //   itemStatusMap[index] = LOADED;
                }
                resolve();
            }, 1500)
        );
    };

    if (loading) {
        return (
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="calc(100vh - 80px)"
            >
                <Spiner />
            </Box>
        );
    }

    if (!items.length) {
        return <Icon />;
    }

    return (
        <InfiniteLoader
            itemCount={found}
            loadMoreItems={loadMoreItems}
            isItemLoaded={isItemLoaded}
            threshold={3}
        >
            {({ onItemsRendered, ref }) => (
                <AutoSizer
                    style={{
                        height: 'calc(100vh - 80px)'
                    }}
                    disableWidth
                >
                    {({ height }) => (
                        <List
                            innerElementType="ul"
                            itemCount={items?.length}
                            itemSize={600}
                            onItemsRendered={onItemsRendered}
                            ref={ref}
                            height={height}
                            width="auto"
                        >
                            {({ index, style }) => {
                                return (
                                    <li
                                        style={{
                                            ...style,
                                            paddingRight: '34px'
                                        }}
                                    >
                                        <VacancyItem
                                            resume_id={resume_id}
                                            message={message}
                                            {...items[index]}
                                        />
                                    </li>
                                );
                            }}
                        </List>
                    )}
                </AutoSizer>
            )}
        </InfiniteLoader>
    );
};

export default memo(VacanciesList);
