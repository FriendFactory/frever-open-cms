import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { inAppPriceTiersLoadAction } from "../store/actions";
import { AppState } from "app-state";

export const useInAppPriceTiers = (stage: string) => {
    const dispatch = useDispatch();

    const info = useSelector(
        (appState: AppState) => appState.inAppPriceTiers[stage] ?? { loading: false },
        shallowEqual
    );

    useEffect(() => {
        if (!info.data && !info.loading) dispatch(inAppPriceTiersLoadAction({ stage }));
    }, []);

    return info;
};
