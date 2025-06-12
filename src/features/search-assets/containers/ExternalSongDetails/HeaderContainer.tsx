import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Alert, Divider, Statistic, Typography } from "antd";
import styled from "styled-components";

import { PageHeader } from "shared";
import { EXTERNAL_SONG_DETAILS_URL } from "urls";
import { extSongDetailsSelector } from "features/search-assets/store/reducer/externalSong/externalSongDetails.reducer";

export function HeaderContainer() {
    const location = useLocation();

    const urlMatch = EXTERNAL_SONG_DETAILS_URL.match(location, true);
    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const info = useSelector(extSongDetailsSelector(urlMatch.params.stage, urlMatch.params.id));

    return (
        <PageHeader
            title={info.data?.songName ?? "..."}
            withBackButton
            extra={
                <Status>
                    <Statistic title="ID" value={urlMatch.params.id ?? "..."} groupSeparator="" />
                    <Divider type="vertical" orientation="center" />
                    <Statistic title="Status" value={info.data?.isDeleted ? "Deleted" : "Active"} groupSeparator="" />
                </Status>
            }>
            {info.data?.isDeleted && (
                <Typography.Text style={{ float: "right" }} type="warning">
                    Notice: External song is deleted. All related videos are possibly hidden.
                </Typography.Text>
            )}
        </PageHeader>
    );
}

const Status = styled.div`
    display: flex;
    width: max-content;
    justify-content: flex-end;
    text-align: center;

    .ant-divider {
        height: auto;
        margin: 0 32px;
    }
`;
