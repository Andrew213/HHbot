import {Box} from "@mui/material";
import {memo, useCallback, useEffect, useRef} from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import {VariableSizeList as List} from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import {CSSProperties} from "styled-components";

import Spiner from "@/components/Spinner/Spiner";
import useAction from "@/hooks/useAction";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import useWindowSize from "@/hooks/useWondowResize";

import {useSearch} from "../Search/SearchContext";
import VacancyItem from "../VacancyItem/VacancyItem";

type VacanciesListT = {
  message: string;
  resume_id: string;
  breakpoint_md: number;
  savedSearchUrl: string | null;
  setErrMsg: (a: string) => void;
};

const VacanciesList: React.FC<VacanciesListT> = ({
  message,
  resume_id,
  breakpoint_md,
  setErrMsg,
}) => {
  const {loading, items, pages, found} = useTypedSelector(
    state => state.Vacancies,
  );

  const {searchValue, currentPage, setCurrentPage} = useSearch();

  const {getSimilarVacancies, searchAllVacancies} = useAction();

  const sizeMap = useRef<Record<string, number>>({});
  type VirtualListRef = {
    resetAfterIndex: (index: string) => void;
  };
  const listRef = useRef<VirtualListRef>();

  const setSize = useCallback((index: string, size: number) => {
    sizeMap.current = {...sizeMap.current, [index]: size};
    listRef.current?.resetAfterIndex(index);
  }, []);

  const getSize = (index: string) => sizeMap.current[index] + 50 || 50;

  const [width, height] = useWindowSize();

  useEffect(() => {
    if (resume_id) {
      getSimilarVacancies(resume_id, 0);
    }
  }, [resume_id]);

  // useEffect(() => {
  //     if (resume_id && !savedSearchUrl) {
  //         getSimilarVacancies(resume_id, 0);
  //     } else {
  //         getVacanciesBySavedSearch(savedSearchUrl as string, 0);
  //     }
  // }, [resume_id, savedSearchUrl]);

  const isItemLoaded = (index: string) => !!items[index];

  const loadMoreItems = () => {
    if (currentPage <= pages) {
      if (searchValue) {
        searchAllVacancies(searchValue, currentPage);
      } else if (resume_id) {
        getSimilarVacancies(resume_id, currentPage);
      }
      // if (searchValue) {
      //     searchAllVacancies(searchValue, currentPage);
      // } else if (resume_id) {
      //     savedSearchUrl
      //         ? getVacanciesBySavedSearch(savedSearchUrl, currentPage)
      //         : getSimilarVacancies(resume_id, currentPage);
      // }
      setCurrentPage(prev => prev + 1);
    }

    return new Promise<void>(resolve =>
      setTimeout(() => {
        // for (let index = startIndex; index <= stopIndex; index++) {
        //   //   itemStatusMap[index] = LOADED;
        // }
        resolve();
      }, 1500),
    );
  };

  let heightOfHeader = width >= breakpoint_md ? 80 : 160; // высота хедера или хедер + инпут поиска

  if (width <= 500) {
    heightOfHeader = 165;
  }

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={`calc(${height} - ${heightOfHeader}px)`}>
        <Spiner />
      </Box>
    );
  }

  return (
    <InfiniteLoader
      itemCount={found}
      loadMoreItems={loadMoreItems}
      isItemLoaded={isItemLoaded}
      threshold={3}>
      {({onItemsRendered}: {onItemsRendered: unknown}) => (
        <AutoSizer
          style={{
            height: `calc(${height}px - ${heightOfHeader}px)`,
          }}
          disableWidth>
          {({height}) => (
            <List
              innerElementType="ul"
              itemCount={items?.length}
              itemSize={getSize}
              onItemsRendered={onItemsRendered}
              ref={listRef}
              height={height}
              width="auto">
              {({index, style}: {index: string; style: CSSProperties}) => {
                return (
                  <li style={style}>
                    <VacancyItem
                      resume_id={resume_id}
                      message={message}
                      setSize={setSize}
                      index={index}
                      setErrMsg={setErrMsg}
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
