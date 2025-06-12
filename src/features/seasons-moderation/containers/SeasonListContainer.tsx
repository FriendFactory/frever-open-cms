import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { SeasonList } from "../components/SeasonList";
import { SeasonBaseInfo, SeasonListQueryParams } from "../services";

import { seasonListPageSelector } from "../store/reducer/seasonList.reducer";
import { SEASON_DETAILS_PAGE_URL, SEASON_LIST_PAGE_URL } from "urls";

export function SeasonListContainer() {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = SEASON_LIST_PAGE_URL.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }

    const info = useSelector(seasonListPageSelector(urlMatch.params.stage, urlMatch.query || {}));

    const onRow = (record: SeasonBaseInfo) => ({
        onClick: () => history.push(SEASON_DETAILS_PAGE_URL.format({ stage: urlMatch.params.stage, id: record.id }))
    });

    const onSort = useCallback(
        (orderBy: SeasonListQueryParams["orderBy"], sortDirection: SeasonListQueryParams["sortDirection"]) => {
            const newUrl = SEASON_LIST_PAGE_URL.replace(
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

    return (
        <SeasonList
            loading={!info.data && info.loading}
            data={info.data}
            stage={urlMatch.params.stage}
            orderBy={urlMatch.query?.orderBy}
            sortDirection={urlMatch.query?.sortDirection}
            onRow={onRow}
            onSort={onSort}
        />
    );
}
