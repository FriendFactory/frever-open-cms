import { useState, useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { OnboardingData, OnboardingDataNames } from "../services";
import { loadEntityListAction } from "../store/actions";
import { onboardingEntityPagerSelector, onboardingEntityPageSelector } from "../store/reducer/entitySelector";

export interface UseSearchEntityProps<T extends OnboardingDataNames> {
    stage: string;
    entityType: T;
    baseSearchParams?: OnboardingData[T]["queryParams"];
}

export function useSearchEntity<T extends OnboardingDataNames>({
    stage,
    baseSearchParams = {},
    entityType
}: UseSearchEntityProps<T>) {
    const dispatch = useDispatch();

    const [params, setParams] = useState<OnboardingData[T]["queryParams"]>(baseSearchParams);

    const info = useSelector(onboardingEntityPageSelector(stage, params, entityType), shallowEqual);
    const infoPager = useSelector(onboardingEntityPagerSelector(stage, params, entityType), shallowEqual);

    const pageChange = useCallback(
        (page: number, take: number) => {
            const newParams = {
                ...params,
                skip: (page - 1) * take,
                take: take ?? infoPager.pageSize
            };
            setParams(newParams);
            dispatch(loadEntityListAction({ stage, params: newParams, entityType }));
        },
        [stage, entityType]
    );

    const onSearch = useCallback((search: string) => setParams({ ...params, skip: 0, search }), [params]);

    return { info, infoPager, pageChange, onSearch };
}
