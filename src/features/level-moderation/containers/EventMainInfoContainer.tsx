import React from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

import { EVENT_DETAILS_PAGE_URL } from "urls";
import { eventDetailsPageSelector } from "../store/reducer/eventDetails.reducer";
import { EventMainInfo } from "../components";

export interface EventMainInfoContainerProps {}

export function EventMainInfoContainer({}: EventMainInfoContainerProps) {
    const location = useLocation();
    const urlMatch = EVENT_DETAILS_PAGE_URL.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }
    const { stage, id } = urlMatch.params;

    const info = useSelector(eventDetailsPageSelector(stage, id));

    return <EventMainInfo stage={stage} data={info.data} loading={!info.data && info.loading} />;
}
