import React from "react";
import { Alert, Typography } from "antd";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import { PageHeader } from "shared";
import { PLAYLIST_DETAILS_PAGE_URL } from "urls";
import { playlistDetailsPageSelector } from "features/external-music/store/reducer/playlists/playlistDetails.reducer";

export function PlaylistHeaderContainer() {
    const location = useLocation();

    const urlMatch = PLAYLIST_DETAILS_PAGE_URL.match(location, true);
    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const info = useSelector(playlistDetailsPageSelector(urlMatch.params.id));
    return (
        <PageHeader
            withBackButton
            title={info.data ? info.data.externalPlaylist?.name : info.loading ? "..." : "??"}
            extra={
                <Typography.Title level={3} type="secondary">
                    ID: {urlMatch.params.id}
                </Typography.Title>
            }>
            <Typography.Text type="secondary">
                Last Updated:&nbsp;
                {info.data?.externalPlaylist?.lastUpdated
                    ? dayjs.utc(info.data.externalPlaylist?.lastUpdated).format("DD MMM YYYY HH:MM")
                    : "..."}
            </Typography.Text>
        </PageHeader>
    );
}
