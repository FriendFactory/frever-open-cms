import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DEFAULT_HASHTAG_LIST_SIZE } from "urls";
import { GetHashtagListParams } from "../services";
import { hashtagListLoadAction } from "../store/actions";
import { HashtagListPageResult, hashtagListPageSelector } from "../store/reducer/hashtagListPage.reducer";

interface useHashtagSearchProps {
    stage: string;
    baseParams?: GetHashtagListParams;
}

export interface useHashtagSearchType {
    info: HashtagListPageResult;
    pageChange: (page: number, take: number) => void;
    onSearch: (newParams: GetHashtagListParams) => void;
}

export function useHashtagSearch({ stage, baseParams = {} }: useHashtagSearchProps) {
    const dispatch = useDispatch();

    const [params, setParams] = useState<GetHashtagListParams>(baseParams);

    useEffect(() => {
        dispatch(
            hashtagListLoadAction({
                stage,
                params
            })
        );
    }, [params, stage]);

    const info = useSelector(hashtagListPageSelector(stage, params));

    const pageChange = (page: number, take: number) =>
        setParams({
            ...params,
            skip: (page - 1) * (take ?? DEFAULT_HASHTAG_LIST_SIZE),
            take: take ?? info.pageSize
        });

    const onSearch = (newParams: GetHashtagListParams) => setParams({ ...params, ...newParams, skip: 0 });

    return { info, pageChange, onSearch };
}
