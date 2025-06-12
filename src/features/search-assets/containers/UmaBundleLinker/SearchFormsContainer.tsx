import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router";

import { UMA_BUNDLE_LINKER_URL } from "urls";
import {
    BaseBunbleValues,
    SearchForms,
    VersionBunbleValues
} from "features/search-assets/components/UmaBundleLinker/SearchForms";

export interface SearchFormsContainerProps {}

export function SearchFormsContainer({}: SearchFormsContainerProps) {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = UMA_BUNDLE_LINKER_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const handleChangeBaseBunFilter = useCallback(
        (form: BaseBunbleValues) => {
            const newUrl = UMA_BUNDLE_LINKER_URL.replace(
                location,
                {},
                {
                    ...form,
                    baseBunSkip: 0
                }
            );

            if (newUrl) {
                history.push(newUrl);
            }
        },
        [history, location]
    );

    const handleChangeVersionBunFilter = useCallback(
        (form: VersionBunbleValues) => {
            const newUrl = UMA_BUNDLE_LINKER_URL.replace(
                location,
                {},
                {
                    ...form,
                    versionBunSkip: 0
                }
            );

            if (newUrl) {
                history.push(newUrl);
            }
        },
        [history, location]
    );

    const { baseBunId, baseBunName, versionBunId, versionBunName } = urlMatch.query || {};

    return (
        <SearchForms
            baseBunValues={{ baseBunId, baseBunName }}
            versionBunValues={{ versionBunId, versionBunName }}
            handleChangeBaseBunFilter={handleChangeBaseBunFilter}
            handleChangeVersionBunFilter={handleChangeVersionBunFilter}
        />
    );
}
