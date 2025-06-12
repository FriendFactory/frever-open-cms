import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COMMUNITY_INBOX_CHAT_LIST_SIZE } from "urls";

import { InboxListQueryParams } from "../services/getInboxList";
import { inboxListLoadAction } from "../store/actions/inboxList";
import { inboxListPageSelector } from "../store/reducer/inboxList/listReducer";

export const UPDATE_DELAY_MS = 15000;

interface UseThemeCollectionsSearchProps {
    stage: string;
    baseParams: InboxListQueryParams;
}

export function useInboxListSearch({ stage, baseParams }: UseThemeCollectionsSearchProps) {
    const dispatch = useDispatch();
    const [params, setParams] = useState<InboxListQueryParams>(baseParams);

    const info = useSelector(inboxListPageSelector(stage, params));

    const loadInboxList = useCallback(() => {
        dispatch(
            inboxListLoadAction({
                stage,
                params
            })
        );
    }, [stage, params]);

    useEffect(() => {
        loadInboxList();
    }, [loadInboxList]);

    useEffect(() => {
        const intervalId = setInterval(loadInboxList, UPDATE_DELAY_MS);

        return () => clearInterval(intervalId);
    }, [loadInboxList]);

    const pageChange = useCallback(
        (page: number, take: number) =>
            setParams({
                ...params,
                skip: (page - 1) * (take ?? COMMUNITY_INBOX_CHAT_LIST_SIZE),
                take: take ?? info.pageSize
            }),
        [params, info.pageSize]
    );

    const onSearch = useCallback((newParams: InboxListQueryParams) => setParams({ ...params, ...newParams }), [params]);

    return { info, pageChange, onSearch };
}
