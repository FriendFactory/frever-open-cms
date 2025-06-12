import React from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

import { TagsCard } from "shared";
import { TagsSelect } from "shared/components/TagsSelect";
import { OUTFIT_DETAILS_URL } from "urls";
import { outfitDetailsPageSelector } from "../store/reducer/outfitDetails.reducer";

export interface OutfitTagsContainerProps {}

export function OutfitTagsContainer({}: OutfitTagsContainerProps) {
    const location = useLocation();
    const urlMatch = OUTFIT_DETAILS_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;
    const { stage, id } = urlMatch.params;

    const info = useSelector(outfitDetailsPageSelector(stage, id));

    return (
        <TagsCard stage={stage} loading={info.loading && !info.data?.tags}>
            <TagsSelect stage={stage} disabled value={info.data?.tags} />
        </TagsCard>
    );
}
