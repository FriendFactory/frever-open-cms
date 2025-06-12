import React from "react";
import { useHistory, useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";

import { QuestGroupListQueryParams } from "../../services";
import { QuestGroupFilterForm } from "../../components/QuestGroupFilterForm";

export interface QuestGroupFilterFormContainerProps {
    url: UrlPath<{ stage: string }, QuestGroupListQueryParams>;
}

export const QuestGroupFilterFormContainer = ({ url }: QuestGroupFilterFormContainerProps) => {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return null;

    const handleChange = (form: QuestGroupListQueryParams) => {
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

    return <QuestGroupFilterForm value={urlMatch.query || {}} onChange={handleChange} />;
};
