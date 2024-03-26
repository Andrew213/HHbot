import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import useAction from 'client/hooks/useAction';
import { useTypedSelector } from 'client/hooks/useTypedSelector';
import { memo, useEffect, useState } from 'react';
import VacancyItem from '../VacancyItem/VacancyItem';
import Spiner from 'client/components/error-boundry/Spiner';
import { Box } from '@mui/material';

const VacanciesList: React.FC<{
    message: string;
    resume_id: string;
}> = ({ message, resume_id }) => {
    const { loading, items, found } = useTypedSelector(
        state => state.Vacancies
    );

    const [currentPage, setCurrentPage] = useState<number>(0);

    const { getVacancies } = useAction();

    useEffect(() => {
        if (resume_id) {
            getVacancies(resume_id, currentPage);
            setCurrentPage(prev => prev + 1);
        }
    }, [resume_id]);

    const isItemLoaded = index => !!items[index];

    const loadMoreItems = (startIndex, stopIndex) => {
        if (resume_id && found >= items.length) {
            getVacancies(resume_id, currentPage);
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
