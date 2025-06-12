import React from "react";
import { useSelector } from "react-redux";
import { Alert, Typography } from "antd";
import { useLocation } from "react-router";

import { crewInfoByIdSelector } from "../store/reducer";
import { PageHeader } from "shared";
import { CREW_DETAILS_PAGE_URL } from "urls";

export function CrewHeaderContainer() {
    const location = useLocation();
    const urlMatch = CREW_DETAILS_PAGE_URL.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const info = useSelector(crewInfoByIdSelector(urlMatch.params.stage, urlMatch.params.id));

    return (
        <PageHeader
            title={info.data?.name ?? "..."}
            extra={
                <Typography.Title level={3} type="secondary">
                    ID: {urlMatch.params.id}
                </Typography.Title>
            }
            withBackButton
        />
    );
}
