import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { useCurrentStage } from "shared";
import { LootBoxQueryParams } from "../services";
import { DEFAULT_LOOT_BOX_PAGE_SIZE, lootBoxListLoadAction } from "../store/actions";
import { lootBoxListSelector } from "../store/reducer/lootBoxListReducer";

const cache: Map<string, boolean | undefined> = new Map();

export interface UseLootBoxDataProps {
    params: LootBoxQueryParams;
    forceUpdate?: boolean;
}

export const useLootBoxData = ({ params, forceUpdate }: UseLootBoxDataProps) => {
    const dispatch = useDispatch();
    const stage = useCurrentStage();
    const [searchParams, setSearchParams] = useState<LootBoxQueryParams>(params);

    const info = useSelector(lootBoxListSelector(stage, searchParams), shallowEqual);

    const handleOnChange = (newValues: LootBoxQueryParams) => {
        const params: LootBoxQueryParams = { ...newValues, skip: 0 };
        dispatch(lootBoxListLoadAction({ stage, params }));
        setSearchParams(newValues);
    };

    const handleOnPage = (page: number) => {
        const skip = (page - 1) * DEFAULT_LOOT_BOX_PAGE_SIZE;
        const params = { searchParams, skip };
        dispatch(lootBoxListLoadAction({ stage, params }));
        setSearchParams({ ...searchParams, skip });
    };

    useEffect(() => {
        if (!cache.get(stage) || forceUpdate) {
            cache.set(stage, true);
            dispatch(lootBoxListLoadAction({ stage, params: {} }));
        }
    }, [stage, forceUpdate]);

    return { info, searchParams, handleOnChange, handleOnPage };
};
