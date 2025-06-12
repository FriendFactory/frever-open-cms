import React from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

import { createCdnURLFromFiles } from "shared";
import { EVENT_DETAILS_PAGE_URL } from "urls";
import { eventDetailsPageSelector } from "../store/reducer/eventDetails.reducer";
import { EventThumbnail } from "../components";

export interface EventThumbnailContainerProps {}

export function EventThumbnailContainer({}: EventThumbnailContainerProps) {
    const location = useLocation();
    const urlMatch = EVENT_DETAILS_PAGE_URL.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }
    const { stage, id } = urlMatch.params;

    const info = useSelector(eventDetailsPageSelector(stage, id));

    const thumbnailUrl =
        info.data &&
        createCdnURLFromFiles({
            id: id,
            files: info.data.files,
            stage,
            entityType: "event",
            resolution: "512x512"
        });

    return <EventThumbnail thumbnailUrl={thumbnailUrl} loading={!thumbnailUrl && info.loading} />;
}
