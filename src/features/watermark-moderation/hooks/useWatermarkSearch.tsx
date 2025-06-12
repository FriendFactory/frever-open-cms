import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DEFAULT_WATERMARK_LIST_SIZE } from "urls";
import { WatermarkPageSelectorType, watermarkListPageSelector } from "../store/reducer";
import { WatermarkListQueryParams } from "../services";
import { watermarkListLoadAction } from "../store/actions";

interface useWatermarkSearchProps {
    stage: string;
    baseParams?: WatermarkListQueryParams;
}

export interface useWatermarkSearchType {
    info: WatermarkPageSelectorType;
    pageChange: (page: number, take: number) => void;
    onSearch: (newParams: WatermarkListQueryParams) => void;
}

export function useWatermarkSearch({ stage, baseParams = {} }: useWatermarkSearchProps) {
    const dispatch = useDispatch();

    const [params, setParams] = useState<WatermarkListQueryParams>(baseParams);

    useEffect(() => {
        dispatch(
            watermarkListLoadAction({
                stage,
                params
            })
        );
    }, [params, stage]);

    const info = useSelector(watermarkListPageSelector(stage, params));

    const pageChange = (page: number, take: number) =>
        setParams({
            ...params,
            skip: (page - 1) * (take ?? DEFAULT_WATERMARK_LIST_SIZE),
            take: take ?? info.pageSize
        });

    const onSearch = (newParams: WatermarkListQueryParams) => setParams({ ...params, ...newParams, skip: 0 });

    return { info, pageChange, onSearch };
}
