import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AssetListParams, EmotionAssetName } from "features/search-assets/services";
import { emotionAssetListLoadAction } from "features/search-assets/store";
import { emotionAssetListPageSelector } from "../store/reducer/asset/emotionAssetListReducer";

export function useEmotionAssetList(stage: string, emotionId: string) {
    const dispatch = useDispatch();

    const [params, setParams] = useState<AssetListParams>({});
    const [loadOnly, setLoadOnly] = useState<EmotionAssetName[] | null>(null);

    useEffect(() => {
        dispatch(
            emotionAssetListLoadAction({
                stage,
                emotionId,
                params,
                loadOnly: loadOnly
            })
        );
    }, [params, stage, loadOnly]);

    const info = useSelector(emotionAssetListPageSelector(stage, emotionId, params));

    const onFilter = (list: EmotionAssetName[]) => setLoadOnly(list || null);

    const pageChange = (page: "next" | "prev") =>
        setParams({
            ...params,
            skip: page === "next" ? info.skip + info.take : info.skip - info.take,
            take: info.take
        });

    const onSearch = (newParams: AssetListParams) =>
        setParams(
            JSON.parse(
                JSON.stringify({
                    ...params,
                    ...newParams,
                    readinessId: newParams.readinessId?.length ? newParams.readinessId : undefined,
                    skip: 0
                })
            )
        );

    const isNextPageAvailable = (info.data?.length ?? 0) > 0;
    const isPrevPageAvailable = (params.skip ?? 0) > 0;

    return { info, params, isNextPageAvailable, isPrevPageAvailable, pageChange, onSearch, onFilter };
}
