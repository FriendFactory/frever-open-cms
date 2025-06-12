import React from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

import { OUTFIT_DETAILS_URL } from "urls";
import { OutfitMainInfo } from "../components/OutfitMainInfo";
import { outfitDetailsPageSelector } from "../store/reducer/outfitDetails.reducer";

export interface OutfitMainInfoContainerProps {}

export function OutfitMainInfoContainer({}: OutfitMainInfoContainerProps) {
    const location = useLocation();
    const urlMatch = OUTFIT_DETAILS_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const { stage, id } = urlMatch.params;
    const info = useSelector(outfitDetailsPageSelector(stage, id));

    return <OutfitMainInfo stage={stage} data={info.data} loading={info.loading} />;
}
