import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import useAction from 'client/hooks/useAction';
import { useTypedSelector } from 'client/hooks/useTypedSelector';
import { memo, useCallback, useEffect, useRef } from 'react';
import VacancyItem from '../VacancyItem/VacancyItem';
import Spiner from 'client/components/error-boundry/Spiner';
import { Box } from '@mui/material';
import { useSearch } from '../Search/SearchContext';
import useWindowSize from 'client/hooks/useWondowResize';

const VacanciesList: React.FC<{
    message: string;
    resume_id: string;
    firstBr: number;
}> = ({ message, resume_id, firstBr }) => {
    const { loading, items, pages, found } = useTypedSelector(
        state => state.Vacancies
    );

    const { searchValue, currentPage, setCurrentPage } = useSearch();

    const { getSimilarVacancies, searchAllVacancies } = useAction();

    const sizeMap = useRef({});
    const listRef: any = useRef();

    const setSize = useCallback((index, size) => {
        sizeMap.current = { ...sizeMap.current, [index]: size };
        listRef.current.resetAfterIndex(index);
    }, []);

    const getSize = index => sizeMap.current[index] + 50 || 50;

    const [width] = useWindowSize();

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

    const heightOfHeader = width >= firstBr ? 80 : 152; // высота хедера или хедер + инпут поиска

    if (loading) {
        return (
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height={`calc(100vh - ${heightOfHeader}px)`}
            >
                <Spiner />
            </Box>
        );
    }

    return (
        <InfiniteLoader
            itemCount={found}
            loadMoreItems={loadMoreItems}
            isItemLoaded={isItemLoaded}
            threshold={3}
        >
            {({ onItemsRendered }) => (
                <AutoSizer
                    style={{
                        height: `calc(100vh - ${heightOfHeader}px)`
                    }}
                    disableWidth
                >
                    {({ height }) => (
                        <List
                            innerElementType="ul"
                            itemCount={items?.length}
                            itemSize={getSize}
                            onItemsRendered={onItemsRendered}
                            ref={listRef}
                            height={height}
                            width="auto"
                        >
                            {({ index, style }) => {
                                return (
                                    <li
                                        style={{
                                            ...style,
                                            paddingRight:
                                                width >= firstBr
                                                    ? '24px'
                                                    : '40px'
                                        }}
                                    >
                                        <VacancyItem
                                            resume_id={resume_id}
                                            message={message}
                                            setSize={setSize}
                                            index={index}
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
