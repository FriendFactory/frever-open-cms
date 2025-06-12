import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ThemeCollectionsQueryParams } from "../services";
import { themeCollectionListPageSelector } from "../store/reducer/collectionListReducer";
import { collectionsListLoadAction } from "../store/actions";
import { DEFAULT_THEME_COLLECTIONS_LIST_SIZE } from "urls";

interface UseThemeCollectionsSearchProps {
    stage: string;
    baseParams: ThemeCollectionsQueryParams;
}

export function useThemeCollectionsSearch({ stage, baseParams }: UseThemeCollectionsSearchProps) {
    const dispatch = useDispatch();

    const [params, setParams] = useState<ThemeCollectionsQueryParams>(baseParams);

    useEffect(() => {
        dispatch(
            collectionsListLoadAction({
                stage,
                params
            })
        );
    }, [params, stage]);

    const info = useSelector(themeCollectionListPageSelector(stage, params, true));

    const pageChange = (page: number, take: number) =>
        setParams({
            ...params,
            skip: (page - 1) * (take ?? DEFAULT_THEME_COLLECTIONS_LIST_SIZE),
            take: take ?? info.pageSize
        });

    const onSearch = (newParams: ThemeCollectionsQueryParams) => setParams({ ...params, ...newParams, skip: 0 });

    return { info, pageChange, onSearch };
}
