import { UrlPath } from "rd-url-utils";
import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router";

import { VIDEO_LEADERBOARD_LIST_URL } from "urls";
import { useExtraDataBundle } from "shared";
import { dateToForm, dateToUrl } from "utils";
import { VideoLeaderboardFilter, VideoLeaderboardFilterValues } from "../components/VideoLeaderboardFilter";
import { VideoLeaderboardQueryParams } from "../services";

interface VideoLeaderboardFilterContainerProps {
    url: UrlPath<{ stage: string }, VideoLeaderboardQueryParams>;
}

export function VideoLeaderboardFilterContainer({ url }: VideoLeaderboardFilterContainerProps) {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = url.match(location);
    if (!urlMatch.isMatched) return null;

    const extraData = useExtraDataBundle(["Country"]);

    const handleOnChangeUrl = useCallback(
        (form: VideoLeaderboardFilterValues) => {
            const query = toUrlParams(form);
            const newUrl = VIDEO_LEADERBOARD_LIST_URL.replace(location, {}, query);

            if (newUrl) history.replace(newUrl);
        },
        [history, location]
    );

    const values = toFormValues(urlMatch.query || {});

    return (
        <VideoLeaderboardFilter
            values={values}
            handleOnChangeUrl={handleOnChangeUrl}
            countries={extraData.bundle.Country?.data}
        />
    );
}

const toFormValues = (params: VideoLeaderboardQueryParams): VideoLeaderboardFilterValues => ({
    ...params,
    access: params.access ? Number(params.access) : 0,
    isDeleted: params.isDeleted ?? "false",
    orderBy: params.orderBy ?? "engagementRate",
    createdTime: params.createdTime ? dateToForm(params.createdTime) : undefined
});

const toUrlParams = (form: VideoLeaderboardFilterValues): VideoLeaderboardQueryParams => ({
    ...form,
    createdTime: form.createdTime ? dateToUrl(form.createdTime) : undefined
});
