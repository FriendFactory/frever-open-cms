import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router";

import { dateToForm, dateToUrl } from "utils";
import { SeasonListFilterForm, SeasonListFilterParams } from "../components/SeasonListFilterForm";
import { SeasonListQueryParams } from "../services";
import { SEASON_LIST_PAGE_URL } from "urls";

export function SeasonListFilterFormContainer() {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = SEASON_LIST_PAGE_URL.match(location);

    if (!urlMatch.isMatched) {
        return <div></div>;
    }

    const handleChange = useCallback(
        (form: SeasonListFilterParams) => {
            const params: SeasonListQueryParams = {
                id: form.id,
                title: form.title,
                startDate: form.startDate ? dateToUrl(form.startDate) : undefined,
                endDate: form.endDate ? dateToUrl(form.endDate) : undefined
            };

            const newUrl = SEASON_LIST_PAGE_URL.replace(
                location,
                {},
                {
                    ...params,
                    skip: undefined
                }
            );

            if (newUrl) {
                history.push(newUrl);
            }
        },
        [history, location]
    );

    const value = {
        endDate: urlMatch.query?.endDate ? dateToForm(urlMatch.query?.endDate) : undefined,
        startDate: urlMatch.query?.startDate ? dateToForm(urlMatch.query?.startDate) : undefined,
        id: urlMatch.query?.id,
        title: urlMatch.query?.title
    };

    return <SeasonListFilterForm value={value} onChange={handleChange} />;
}
