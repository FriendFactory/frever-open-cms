import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Typography } from "antd";

import { PageHeader } from "shared";
import { seasonDetailsPageSelector } from "../../store/reducer/seasonDetails.reducer";
import { SEASON_DETAILS_PAGE_URL } from "urls";

export function SeasonDetailsHeaderContainer() {
    const location = useLocation();

    const urlMatch = SEASON_DETAILS_PAGE_URL.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }

    const info = useSelector(seasonDetailsPageSelector(urlMatch.params.stage, urlMatch.params.id), shallowEqual);

    return (
        <PageHeader
            title={info.data?.title}
            withBackButton
            extra={
                <Typography.Title level={3} type="secondary">
                    ID: {info.data?.id ?? "..."}
                </Typography.Title>
            }
        />
    );
}
