import React from "react";
import { useSelector } from "react-redux";
import { Alert, Typography } from "antd";

import { PageHeader } from "shared";
import { UMA_BUNDLE_DETAILS_URL } from "urls";
import { umaBundlDetailsPageSlector } from "features/search-assets/store";

export function UmaBundleHeaderContainer() {
    const urlMatch = UMA_BUNDLE_DETAILS_URL.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const { stage, id } = urlMatch.params;

    const info = useSelector(umaBundlDetailsPageSlector(stage, id));

    return (
        <PageHeader
            title={info.data?.assetBundleName ?? ""}
            withBackButton
            extra={
                <Typography.Title level={3} type="secondary">
                    ID: {info.data?.id ?? "..."}
                </Typography.Title>
            }
        />
    );
}
