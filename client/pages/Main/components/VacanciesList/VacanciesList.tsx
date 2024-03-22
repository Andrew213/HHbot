import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { CircularProgress, Grid } from '@mui/material';
import useAction from 'client/hooks/useAction';
import { useTypedSelector } from 'client/hooks/useTypedSelector';
import { useEffect, useState } from 'react';
import VacancyItem from '../VacancyItem/VacancyItems';

const VacanciesList = () => {
    const { user } = useTypedSelector(state => state.User);
    const { loading, items, found } = useTypedSelector(
        state => state.Vacancies
    );
    const [currentPage, setCurrentPage] = useState<number>(0);

    const { getVacancies } = useAction();

    useEffect(() => {
        if (user.resumeList) {
            getVacancies(user.resumeList[0].id, currentPage);
            setCurrentPage(prev => prev + 1);
        }
    }, [user.resumeList]);

    const isItemLoaded = index => !!items[index];

    const loadMoreItems = (startIndex, stopIndex) => {
        if (user.resumeList && found >= items.length) {
            getVacancies(user.resumeList[0].id, currentPage);
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
            <Grid
                alignContent="center"
                alignItems="center"
                display="flex"
                justifyContent="center"
                sx={{
                    height: 'calc(100vh - 80px)'
                }}
            >
                <svg width={0} height={0}>
                    <defs>
                        <linearGradient
                            id="my_gradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="#e01cd5" />
                            <stop offset="100%" stopColor="#1CB5E0" />
                        </linearGradient>
                    </defs>
                </svg>
                <CircularProgress
                    size={120}
                    sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
                />
            </Grid>
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
                            itemSize={500}
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
                                            paddingRight: '24px'
                                        }}
                                    >
                                        <VacancyItem {...items[index]} />
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

export default VacanciesList;
