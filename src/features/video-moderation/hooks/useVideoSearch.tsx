import { useCallback, useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { GetVideoListParams } from "../services";
import { DEFAULT_VIDEO_PAGE_SIZE } from "urls";
import { videoModerationListLoadAction, videoModerationListPageSelector } from "../store";

interface UseVideoSearchProps {
    stage: string;
    baseSearchParams?: GetVideoListParams;
}

export function useVideoSearch({ stage, baseSearchParams = {} }: UseVideoSearchProps) {
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useState<GetVideoListParams>(baseSearchParams);

    useEffect(() => {
        dispatch(videoModerationListLoadAction({ stage, params: searchParams }));
    }, [searchParams, stage]);

    const info = useSelector(videoModerationListPageSelector(stage, searchParams), shallowEqual);

    const pageChange = useCallback(
        (page: number, take: number) => {
            setSearchParams({
                ...searchParams,
                skip: (page - 1) * (take ?? DEFAULT_VIDEO_PAGE_SIZE),
                take: take ?? info.pageSize
            });
        },
        [searchParams]
    );

    const onSearch = useCallback(
        (newParams: GetVideoListParams) => setSearchParams({ ...searchParams, skip: 0, ...newParams }),
        [searchParams]
    );

    return { info, pageChange, onSearch };
}
