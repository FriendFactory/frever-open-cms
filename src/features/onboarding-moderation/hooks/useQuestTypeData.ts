import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { useCurrentStage } from "shared";
import { questTypeListLoadingAction } from "../store/actions";
import { onboardingQuestTypePageSelector } from "../store/reducer/questTypeReducer";

const cache: Map<string, boolean | undefined> = new Map();

export const useQuestTypeData = (forceUpdate?: boolean) => {
    const dispatch = useDispatch();
    const stage = useCurrentStage();

    const info = useSelector(onboardingQuestTypePageSelector(stage), shallowEqual);

    useEffect(() => {
        if (!cache.get(stage) || forceUpdate) {
            cache.set(stage, true);
            dispatch(questTypeListLoadingAction({ stage }));
        }
    }, [stage, forceUpdate]);

    return { info };
};
