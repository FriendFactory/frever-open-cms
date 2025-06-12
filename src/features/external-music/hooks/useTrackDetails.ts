import { useCallback, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { TrackDetailsQueryParams } from "../services";
import { trackDetailsHandleLoadAction } from "../store/actions";
import { trackDetailsPageSelector } from "../store/reducer/trackDetailsReducer";

export function useTrackDetails(stage: string) {
    const dispatch = useDispatch();

    const [params, setParams] = useState<Partial<TrackDetailsQueryParams>>({});
    const infoTrackDetails = useSelector(trackDetailsPageSelector(params), shallowEqual);

    const onSearchTrackDetails = useCallback(
        (trackId: number, country?: string) => {
            const newParams: TrackDetailsQueryParams = { ...params, trackId, country };
            dispatch(
                trackDetailsHandleLoadAction({
                    stage,
                    params: newParams
                })
            );

            setParams(newParams);
        },
        [params]
    );

    return { infoTrackDetails, onSearchTrackDetails };
}
