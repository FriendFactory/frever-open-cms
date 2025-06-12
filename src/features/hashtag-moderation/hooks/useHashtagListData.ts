import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import { GetHashtagListParams } from "../services";
import { hashtagListLoadAction } from "../store/actions";
import { hashtagListPageSelector } from "../store/reducer/hashtagListPage.reducer";
import { DEFAULT_HASHTAG_LIST_SIZE } from "urls";

export interface UseHashtagListDataProps {
    stage: string;
    params: GetHashtagListParams;
}

export function useHashtagListData({ stage, params }: UseHashtagListDataProps) {
    const dispatch = useDispatch();
    const location = useLocation();

    const [additionalPageSkips, setAddtlPagesSkips] = useState<number[]>([]);

    useEffect(() => () => setAddtlPagesSkips([]), [location]);

    const info = useSelector(hashtagListPageSelector(stage, params, additionalPageSkips));

    const loadNextPage = useCallback(() => {
        const nextPageSkip = (additionalPageSkips.length + info.currentPage) * DEFAULT_HASHTAG_LIST_SIZE;

        dispatch(
            hashtagListLoadAction({
                stage,
                params: { ...params, skip: nextPageSkip }
            })
        );

        setAddtlPagesSkips([...additionalPageSkips, nextPageSkip]);
    }, [stage, additionalPageSkips, params]);

    return {
        info,
        loadNextPage
    };
}
