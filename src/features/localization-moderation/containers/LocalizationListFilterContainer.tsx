import React from "react";
import { useHistory, useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";

import { LocalizationFilterForm } from "../components/LocalizationFilterForm";
import { LocalizationQueryParams } from "../services";

export interface LocalizationListFilterContainerProps {
    url: UrlPath<{ stage: string }, LocalizationQueryParams>;
}

export const LocalizationListFilterContainer = ({ url }: LocalizationListFilterContainerProps) => {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return null;

    const handleChange = (form: LocalizationQueryParams) => {
        const newUrl = url.replace(
            location,
            {},
            {
                ...form,
                skip: 0
            }
        );

        if (newUrl) history.push(newUrl);
    };

    return <LocalizationFilterForm value={urlMatch.query || {}} onChange={handleChange} />;
};
