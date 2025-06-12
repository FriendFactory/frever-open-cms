import { useCallback, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { TracksSearchQueryParams } from "../services/getTracks";
import { tracksSearchHandleLoadAction } from "../store/actions";
import { trackSearchPageSelector } from "../store/reducer/trackSearch.reducer";

export function useTracksSearch(stage: string) {
    const dispatch = useDispatch();

    const [params, setParams] = useState<Partial<TracksSearchQueryParams>>({});
    const info = useSelector(trackSearchPageSelector(params), shallowEqual);

    const pageChange = useCallback(
        (page: number) => {
            const { q, pageSize } = params;

            if (q) {
                const newParams = { q, pageSize, page: page.toString() };
                dispatch(
                    tracksSearchHandleLoadAction({
                        stage,
                        params: newParams
                    })
                );

                setParams(newParams);
            }
        },
        [params]
    );

    const onSearch = useCallback(
        (q: string, country?: string) => {
            const newParams = { ...params, q, country };
            dispatch(
                tracksSearchHandleLoadAction({
                    stage,
                    params: newParams
                })
            );

            setParams(newParams);
        },
        [params]
    );

    return { info, onSearch, pageChange };
}
