import React, { useCallback, useMemo, useState } from "react";
import { Button } from "antd";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";

import { HashtagSortingMode } from "../components/HashtagSortingMode";
import { HASHTAG_SORTING_PAGE_URL } from "urls";
import { useHashtagListData } from "../hooks/useHashtagListData";
import { Hashtag } from "../services";
import { FixedPageHeader } from "shared";
import { updateSortOrderAction } from "../store/actions";

export function HashtagSortingContainer() {
    const location = useLocation();
    const dispatch = useDispatch();

    const urlMatch = HASHTAG_SORTING_PAGE_URL.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }

    const {
        query,
        params: { stage }
    } = urlMatch;

    const { info, loadNextPage } = useHashtagListData({ stage, params: query ?? {} });

    const [hashtagsToUpdate, setHashtagsToUpdate] = useState<{ [key: string]: Hashtag }>({});

    const addHashtagToUpdateList = useCallback(
        (hashtag: Hashtag, newChallengeSortOrder: string) => {
            const numberValue = Number(newChallengeSortOrder);
            if (!isNaN(numberValue)) {
                setHashtagsToUpdate({
                    ...hashtagsToUpdate,
                    [hashtag.id]: { ...hashtag, challengeSortOrder: numberValue }
                });
            }
        },
        [hashtagsToUpdate]
    );

    const data = useMemo(
        () =>
            info.data
                ?.map(
                    (sourceHashtag) =>
                        Object.values(hashtagsToUpdate).find(
                            (updatedHashtag) => sourceHashtag.id === updatedHashtag.id
                        ) ?? sourceHashtag
                )
                .sort((a, b) => {
                    if (a.challengeSortOrder === 0) {
                        return 1;
                    }
                    if (b.challengeSortOrder === 0) {
                        return -1;
                    }
                    return a.challengeSortOrder - b.challengeSortOrder;
                }) ?? [],
        [info.data, hashtagsToUpdate]
    );

    const isSaveChangesHeaderActive = useMemo(() => !!Object.values(hashtagsToUpdate).length, [hashtagsToUpdate]);

    const handleOnSubmit = () => {
        dispatch(updateSortOrderAction({ stage, data: Object.values(hashtagsToUpdate) }));
        setHashtagsToUpdate({});
    };

    const handleOnReset = () => {
        setHashtagsToUpdate({});
    };

    return (
        <>
            <HashtagSortingMode
                data={data}
                loading={!data.length && info.loading}
                addHashtagToUpdateList={addHashtagToUpdateList}
            />
            <Button
                disabled={!info.isNextPageAvailable}
                loading={info.loading}
                type="primary"
                block
                ghost
                onClick={loadNextPage}>
                Load More Hashtags
            </Button>

            {isSaveChangesHeaderActive && (
                <FixedPageHeader
                    title="Unsaved changes"
                    extra={[
                        <Button onClick={handleOnReset}>Discard</Button>,
                        <Button type="primary" onClick={handleOnSubmit}>
                            Save
                        </Button>
                    ]}
                />
            )}
        </>
    );
}
