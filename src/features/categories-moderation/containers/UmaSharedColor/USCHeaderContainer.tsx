import React from "react";
import { useLocation } from "react-router";
import { Typography } from "antd";

import { PageHeader } from "shared";
import { UMA_SHARED_COLOR_DETAILS_URL } from "urls";
import { useExtraData } from "shared/hooks/useExtraData";

export function USCHeaderContainer() {
    const location = useLocation();

    const urlMatch = UMA_SHARED_COLOR_DETAILS_URL.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }

    const info = useExtraData({ stage: urlMatch.params.stage, name: "UmaSharedColor" });

    const umaSharedColor = info.data?.find((el) => el.id === Number(urlMatch.params.id));

    return (
        <PageHeader
            title={umaSharedColor?.name ?? "..."}
            withBackButton
            extra={
                <Typography.Title level={3} type="secondary">
                    ID: {umaSharedColor?.id ?? "..."}
                </Typography.Title>
            }
        />
    );
}
