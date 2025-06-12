import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { templateSortingModeLoadAction, templateSortingModeSelector } from "features/video-templates/store";
import { LoadMore } from "features/video-templates/components/TemplateSortingMode/LoadMore";
import { SortOrderTypes } from "features/video-templates/services";

export interface LoadMoreContainerProps {
    stage: string;
    sortOrderType: SortOrderTypes;
    categoryId?: number;
}

export function LoadMoreContainer({ stage, categoryId, sortOrderType }: LoadMoreContainerProps) {
    const dispatch = useDispatch();

    const { withValueCount, withValueLoadedCount, restCount, restLoadedCount } =
        useSelector(templateSortingModeSelector);

    const IsLoadedAllWithValue = useMemo(
        () => withValueLoadedCount === withValueCount,
        [withValueCount, withValueLoadedCount]
    );

    const IsLoadedAllRest = useMemo(() => restLoadedCount === restCount, [restLoadedCount, restCount]);
    const loadMoreParams = useMemo(
        () => ({
            byUsageCount: IsLoadedAllWithValue,
            skip: !IsLoadedAllWithValue ? withValueLoadedCount : restLoadedCount,
            categoryId
        }),
        [IsLoadedAllWithValue, withValueLoadedCount, restLoadedCount, categoryId]
    );

    const handleLoadMore = useCallback(
        () => dispatch(templateSortingModeLoadAction({ stage, sortOrderType, params: loadMoreParams })),
        [stage, sortOrderType, loadMoreParams]
    );

    return (
        <LoadMore
            sortOrderType={sortOrderType}
            withValueLoadedCount={withValueLoadedCount}
            withValueCount={withValueCount}
            restLoadedCount={restLoadedCount}
            restCount={restCount}
            allLoaded={IsLoadedAllWithValue && IsLoadedAllRest}
            handleLoadMore={handleLoadMore}
        />
    );
}
