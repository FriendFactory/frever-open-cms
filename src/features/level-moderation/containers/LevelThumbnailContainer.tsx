import React from "react";
import { useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";
import { useSelector } from "react-redux";

import { createCdnURLFromFiles } from "shared";
import { levelDetailsPageSelector } from "../store/reducer/levelDetails.reducer";
import { EventThumbnail } from "../components";

export interface LevelThumbnailContainerProps {
    url: UrlPath<{ stage: string; id: number }, {}>;
}

export function LevelThumbnailContainer({ url }: LevelThumbnailContainerProps) {
    const location = useLocation();
    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) {
        return <div></div>;
    }
    const { stage, id } = urlMatch.params;

    const info = useSelector(levelDetailsPageSelector(stage, id));

    const event = info.data?.event?.[0];

    const thumbnailUrl = event?.files.length
        ? createCdnURLFromFiles({
              id: event.id,
              files: event.files,
              stage,
              entityType: "event",
              resolution: "512x512"
          })
        : "";

    return <EventThumbnail thumbnailUrl={thumbnailUrl} loading={!info.data && info.loading} />;
}
