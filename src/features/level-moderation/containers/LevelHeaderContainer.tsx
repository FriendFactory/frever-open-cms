import React from "react";
import { UrlPath } from "rd-url-utils";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

import { levelDetailsPageSelector } from "../store/reducer/levelDetails.reducer";
import { LevelHeader } from "../components";

export interface LevelHeaderContainerProps {
    url: UrlPath<{ stage: string; id: number }, {}>;
}

export function LevelHeaderContainer({ url }: LevelHeaderContainerProps) {
    const location = useLocation();

    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }
    const { stage, id } = urlMatch.params;

    const info = useSelector(levelDetailsPageSelector(stage, id));

    return <LevelHeader id={id} level={info.data} />;
}
