import { useState, useEffect, useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { AssetDataNames, AssetListParams } from "features/search-assets/services";
import { assetListHandleLoadAction, assetListPageSelector } from "features/search-assets/store";
import { DEFAULT_ASSETS_PAGE_SIZE } from "urls";

export interface UseAssetSearchProps<T extends AssetDataNames = AssetDataNames> {
    stage: string;
    asset: T;
    baseSearchParams?: AssetListParams;
    useCompactWardrobeList?: boolean;
}

export function useAssetSearch({ asset, stage, baseSearchParams = {}, useCompactWardrobeList }: UseAssetSearchProps) {
    const dispatch = useDispatch();

    const [params, setParams] = useState<AssetListParams>(baseSearchParams);

    useEffect(() => {
        dispatch(assetListHandleLoadAction({ stage, asset, params, useCompactWardrobeList }));
    }, [params, stage]);

    const info = useSelector(assetListPageSelector(stage, params, asset), shallowEqual);

    const pageChange = useCallback(
        (page: number, take: number) =>
            setParams({
                ...params,
                skip: (page - 1) * (take ?? DEFAULT_ASSETS_PAGE_SIZE),
                take: take ?? info.pageSize
            }),
        [params]
    );

    const onSearch = useCallback(
        (newParams: AssetListParams) => setParams({ ...params, skip: 0, ...newParams }),
        [params]
    );

    return { info, pageChange, onSearch };
}
