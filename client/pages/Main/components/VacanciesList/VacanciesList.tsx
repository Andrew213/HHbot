import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import useAction from 'client/hooks/useAction';
import { useTypedSelector } from 'client/hooks/useTypedSelector';
import { useEffect, useState } from 'react';
import VacancyItem from '../VacancyItem/VacancyItem';
import Spiner from 'client/components/error-boundry/Spiner';
import { useSearchParams } from 'react-router-dom';

const VacanciesList: React.FC = () => {
    const { user } = useTypedSelector(state => state.User);
    const { loading, items, found } = useTypedSelector(
        state => state.Vacancies
    );

    const [resumeId, setResumeId] = useState<string>();

    const [currentPage, setCurrentPage] = useState<number>(0);

    const [searchParams, setSearchParams] = useSearchParams();

    const { getVacancies } = useAction();

    useEffect(() => {
        if (searchParams.has('resume')) {
            setResumeId(searchParams.get('resume') as string);
            getVacancies(searchParams.get('resume') as string, currentPage);
        }
    }, [searchParams]);

    const isItemLoaded = index => !!items[index];

    const loadMoreItems = (startIndex, stopIndex) => {
        if (resumeId && found >= items.length) {
            getVacancies(resumeId, currentPage);
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
        return <Spiner />;
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
