import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { INTELLECTUAL_PROPERTY_LIST_SIZE } from "urls";
import { IntellectualPropertyPageSelectorType, intellectualPropertyListPageSelector } from "../store/reducer";
import { IntellectualPropertyQueryParams } from "../services";
import { intellectualPropertyListLoadAction } from "../store/actions";

interface UseIntellectualPropertySearchProps {
    stage: string;
    baseParams?: IntellectualPropertyQueryParams;
}

export interface UseIntellectualPropertySearchType {
    info: IntellectualPropertyPageSelectorType;
    pageChange: (page: number, take: number) => void;
    onSearch: (newParams: IntellectualPropertyQueryParams) => void;
}

export function useIntellectualPropertySearch({ stage, baseParams = {} }: UseIntellectualPropertySearchProps) {
    const dispatch = useDispatch();

    const [params, setParams] = useState<IntellectualPropertyQueryParams>(baseParams);

    useEffect(() => {
        dispatch(
            intellectualPropertyListLoadAction({
                stage,
                params
            })
        );
    }, [params, stage]);

    const info = useSelector(intellectualPropertyListPageSelector(stage, params));

    const pageChange = (page: number, take: number) =>
        setParams({
            ...params,
            skip: (page - 1) * (take ?? INTELLECTUAL_PROPERTY_LIST_SIZE),
            take: take ?? info.pageSize
        });

    const onSearch = (newParams: IntellectualPropertyQueryParams) => setParams({ ...params, ...newParams, skip: 0 });

    return { info, pageChange, onSearch };
}
