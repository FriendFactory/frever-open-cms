import React from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

import { UMA_BUNDLE_DETAILS_URL } from "urls";
import { umaBundlDetailsPageSlector } from "features/search-assets/store";
import { UmaWardrobeList } from "features/search-assets/components/UmaBundleDetails/UmaWardrobeList";
import { useExtraData } from "shared/hooks/useExtraData";

export interface UmaWardrobeListContainerProps {}

export function UmaWardrobeListContainer({}: UmaWardrobeListContainerProps) {
    const location = useLocation();

    const urlMatch = UMA_BUNDLE_DETAILS_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const { stage, id } = urlMatch.params;

    const info = useSelector(umaBundlDetailsPageSlector(stage, id));
    const readinessList = useExtraData({ stage, name: "Readiness" });

    if (!info.data) return null;

    return <UmaWardrobeList data={info.data.wardrobe} stage={stage} readinessList={readinessList.data ?? []} />;
}
