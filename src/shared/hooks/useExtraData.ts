import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { ExtraDataName } from "shared/services/api";
import { extraDataBundleSelector, extraDataLoadAction, extraDataSelector } from "shared/store";
import { useCurrentStage } from "./useCurrentStage";

const createDataKey = (stage: string, name: string) => `${stage}/${name}`;

const cache: Map<string, boolean | undefined> = new Map();

export interface UseGetExtraDataProps<T> {
    stage: string;
    name: T;
    forceUpdate?: boolean;
}

export function useExtraData<T extends ExtraDataName>({ stage, name, forceUpdate }: UseGetExtraDataProps<T>) {
    const dispatch = useDispatch();
    const info = useSelector(extraDataSelector(stage, name), shallowEqual);

    const key = createDataKey(stage, name);

    useEffect(() => {
        if (!cache.get(key) || forceUpdate) {
            cache.set(key, true);
            dispatch(extraDataLoadAction({ stage, entities: [name] }));
        }
    }, [key, forceUpdate]);

    return info;
}

export function useExtraDataBundle<T extends ExtraDataName>(
    values: Array<T | { name: T; forceUpdate?: boolean }>,
    targetStage?: string
) {
    const dispatch = useDispatch();
    const stage = targetStage ?? useCurrentStage();

    const names = values.map((el) => (typeof el === "string" ? el : el.name));
    const data = useSelector(extraDataBundleSelector(stage, names), shallowEqual);

    useEffect(() => {
        const entities = values
            .filter((el) => {
                const key = createDataKey(stage, typeof el === "string" ? el : el.name);
                const forceUpdate = typeof el !== "string" && el.forceUpdate;
                const result = !cache.get(key) || forceUpdate;

                cache.set(key, true);
                return result;
            })
            .map((el) => (typeof el === "string" ? el : el.name));

        if (entities.length > 0) {
            dispatch(extraDataLoadAction({ stage, entities }));
        }
    }, [JSON.stringify(values), stage]);

    return data;
}
