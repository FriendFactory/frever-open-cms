import React from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

import { EVENT_DETAILS_PAGE_URL } from "urls";
import { eventDetailsPageSelector } from "../store/reducer/eventDetails.reducer";
import { EventHeader } from "../components";

export interface EventHeaderContainerProps {}

export function EventHeaderContainer({}: EventHeaderContainerProps) {
    const location = useLocation();

    const urlMatch = EVENT_DETAILS_PAGE_URL.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }
    const { stage, id } = urlMatch.params;

    const info = useSelector(eventDetailsPageSelector(stage, id));

    return <EventHeader id={id} event={info.data} />;
}
