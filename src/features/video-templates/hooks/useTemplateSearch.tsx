import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DEFAULT_TEMPLATE_LIST_PAGE_SIZE } from "urls";
import { TemplateFilterParams } from "../services";
import { templateListLoadAction, TemplateListPageResult, templateListPageSelector } from "../store";

interface useTemplateSearchProps {
    stage: string;
    baseParams?: TemplateFilterParams;
}

export interface useTemplateSearchType {
    info: TemplateListPageResult;
    pageChange: (page: number, take: number) => void;
    onSearch: (newParams: TemplateFilterParams) => void;
}

export function useTemplateSearch({ stage, baseParams = {} }: useTemplateSearchProps) {
    const dispatch = useDispatch();

    const [params, setParams] = useState<TemplateFilterParams>(baseParams);

    useEffect(() => {
        dispatch(
            templateListLoadAction({
                stage,
                params
            })
        );
    }, [params, stage]);

    const info = useSelector(templateListPageSelector(stage, params));

    const pageChange = (page: number, take: number) =>
        setParams({
            ...params,
            skip: (page - 1) * (take ?? DEFAULT_TEMPLATE_LIST_PAGE_SIZE),
            take: take ?? info.pageSize
        });

    const onSearch = (newParams: TemplateFilterParams) => setParams({ ...params, ...newParams, skip: 0 });

    return { info, pageChange, onSearch };
}
