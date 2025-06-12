import React from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Empty } from "antd";

import { UMA_BUNDLE_DETAILS_URL } from "urls";
import { LoadingContainer } from "shared";
import { umaBundlDetailsPageSlector } from "features/search-assets/store";
import { UmaBundleInfo } from "features/search-assets/components/UmaBundleDetails/UmaBundleInfo";
import { useExtraData } from "shared/hooks/useExtraData";

export interface UmaBundleInfoContainerProps {}

export function UmaBundleInfoContainer({}: UmaBundleInfoContainerProps) {
    const location = useLocation();
    const urlMatch = UMA_BUNDLE_DETAILS_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const { stage, id } = urlMatch.params;

    const info = useSelector(umaBundlDetailsPageSlector(stage, id));
    const readinessList = useExtraData({ stage, name: "Readiness" });

    if ((!info.data && info.loading) || readinessList.loading) {
        return <LoadingContainer loading />;
    }

    if (!info.data) return <Empty />;

    return <UmaBundleInfo data={info.data} readinessList={readinessList.data ?? []} />;
}
