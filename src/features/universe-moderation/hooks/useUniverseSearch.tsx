import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DEFAULT_UNIVERSE_LIST_SIZE } from "urls";
import { UniverPageSelectorType, universeListPageSelector } from "../store/reducer";
import { UniverseListQueryParams } from "../services";
import { universeListLoadAction } from "../store/actions";

interface UseUniverseSearchProps {
    stage: string;
    baseParams?: UniverseListQueryParams;
}

export interface UseUniverseSearchType {
    info: UniverPageSelectorType;
    pageChange: (page: number, take: number) => void;
    onSearch: (newParams: UniverseListQueryParams) => void;
}

export function useUniverseSearch({ stage, baseParams = {} }: UseUniverseSearchProps) {
    const dispatch = useDispatch();

    const [params, setParams] = useState<UniverseListQueryParams>(baseParams);

    useEffect(() => {
        dispatch(
            universeListLoadAction({
                stage,
                params
            })
        );
    }, [params, stage]);

    const info = useSelector(universeListPageSelector(stage, params));

    const pageChange = (page: number, take: number) =>
        setParams({
            ...params,
            skip: (page - 1) * (take ?? DEFAULT_UNIVERSE_LIST_SIZE),
            take: take ?? info.pageSize
        });

    const onSearch = (newParams: UniverseListQueryParams) => setParams({ ...params, ...newParams, skip: 0 });

    return { info, pageChange, onSearch };
}
