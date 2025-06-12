import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router";

import { USER_LEADERBOARD_LIST_URL } from "urls";
import { LeaderboardFilter, LeaderboardFilterValues } from "../components/LeaderboardFilter";
import { GetLeaderboardListParams } from "../services";
import { dateToForm, dateToUrl } from "utils";

export function LeaderboardFilterContainer({}: {}) {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = USER_LEADERBOARD_LIST_URL.match(location);

    if (!urlMatch.isMatched) {
        return <div></div>;
    }

    const handleChange = useCallback(
        (value: LeaderboardFilterValues) => {
            const params = toUrlParams(value);
            const newUrl = USER_LEADERBOARD_LIST_URL.replace(location, {}, { ...params, skip: 0 });

            if (newUrl) {
                history.push(newUrl);
            }
        },
        [history, location]
    );

    const values = toFormValues(urlMatch.query || {});

    return <LeaderboardFilter values={values} handleChange={handleChange} />;
}

const toFormValues = (params: GetLeaderboardListParams): LeaderboardFilterValues => ({
    ...params,
    propertyName: params.propertyName ?? "followersCount",
    dateRange: params.dateRange ? dateToForm(params.dateRange) : undefined
});

const toUrlParams = (form: LeaderboardFilterValues): GetLeaderboardListParams => ({
    ...form,
    propertyName: form.propertyName ?? "followersCount",
    dateRange: form.dateRange ? dateToUrl(form.dateRange) : undefined
});
