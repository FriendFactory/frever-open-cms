import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router";

import { UMA_BUNDLE_SEARCH_URL } from "urls";
import { SearchFilterForm } from "features/search-assets/components/UmaBundleSearch/SearchFilterForm";
import { UmaBudnleListQueryParams } from "features/search-assets/services";

export interface SearchFilterFormContainerProps {}

export function SearchFilterFormContainer({}: SearchFilterFormContainerProps) {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = UMA_BUNDLE_SEARCH_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const handleChange = useCallback(
        (form: UmaBudnleListQueryParams) => {
            const newUrl = UMA_BUNDLE_SEARCH_URL.replace(
                location,
                {},
                {
                    ...form,
                    skip: 0
                }
            );

            if (newUrl) {
                history.push(newUrl);
            }
        },
        [history, location]
    );

    const { id, name, searchFilter } = urlMatch.query || {};

    return (
        <SearchFilterForm values={{ id, name, searchFilter: searchFilter ?? "contains" }} handleChange={handleChange} />
    );
}
