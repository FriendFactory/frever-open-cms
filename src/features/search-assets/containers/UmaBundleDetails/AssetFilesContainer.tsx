import React from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

import { UMA_BUNDLE_DETAILS_URL } from "urls";
import { umaBundlDetailsPageSlector } from "features/search-assets/store";
import { AssetFiles } from "features/search-assets/components/UmaBundleDetails/AssetFiles";

export interface AssetFilesContainerProps {}

export function AssetFilesContainer({}: AssetFilesContainerProps) {
    const location = useLocation();
    const urlMatch = UMA_BUNDLE_DETAILS_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const { stage, id } = urlMatch.params;

    const info = useSelector(umaBundlDetailsPageSlector(stage, id));

    if (!info.data) return null;

    return <AssetFiles data={info.data.umaAsset} stage={stage} />;
}
