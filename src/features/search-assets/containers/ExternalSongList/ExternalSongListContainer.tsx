import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import { EXTERNAL_SONG_DETAILS_URL, EXTERNAL_SONG_LIST_URL } from "urls";
import { externalSongListPageSelector } from "features/search-assets/store/reducer/externalSong/externalSongList.reducer";
import { ExternalSong, ExternalSongListQueryParams } from "features/search-assets/services";
import { ExternalSongList } from "features/search-assets/components/ExternalSong/ExternalSongList";

export function ExternalSongListContainer() {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = EXTERNAL_SONG_LIST_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const info = useSelector(externalSongListPageSelector(urlMatch.params.stage, urlMatch.query || {}));

    const onSort = useCallback(
        (
            orderBy: ExternalSongListQueryParams["orderBy"],
            sortDirection: ExternalSongListQueryParams["sortDirection"]
        ) => {
            const newUrl = EXTERNAL_SONG_LIST_URL.replace(
                location,
                {},
                {
                    orderBy,
                    sortDirection
                }
            );

            if (newUrl) {
                history.push(newUrl);
            }
        },
        [location, history]
    );

    const handleOnRow = (record: ExternalSong) => ({
        onClick: () => history.push(EXTERNAL_SONG_DETAILS_URL.format({ stage: urlMatch.params.stage, id: record.id }))
    });

    return (
        <ExternalSongList
            stage={urlMatch.params.stage}
            loading={!info.data && info.loading}
            data={info.data}
            orderBy={urlMatch.query?.orderBy}
            sortDirection={urlMatch.query?.sortDirection}
            onSort={onSort}
            handleOnRow={handleOnRow}
        />
    );
}
