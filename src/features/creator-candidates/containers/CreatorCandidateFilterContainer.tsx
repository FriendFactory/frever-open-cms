import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router";
import { dateToForm, dateToUrl } from "utils";

import { CREATOR_CANDIDATE_LIST_URL } from "urls";
import { CreatorCandidatesQueryParams } from "../services";
import { CreatorCandidateFilter, CreatorCandidateFormInitialValues } from "../components/CreatorCandidateFilter";

export function CreatorCandidateFilterContainer() {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = CREATOR_CANDIDATE_LIST_URL.match(location);

    if (!urlMatch.isMatched) return null;

    const handleOnFinish = useCallback(
        (newValues: CreatorCandidateFormInitialValues) => {
            const params: CreatorCandidatesQueryParams = {
                ...newValues,
                modifiedTime: newValues.modifiedTime ? dateToUrl(newValues.modifiedTime) : undefined,
                createdTime: newValues.createdTime ? dateToUrl(newValues.createdTime) : undefined,
                skip: undefined
            };

            const newUrl = CREATOR_CANDIDATE_LIST_URL.replace(location, {}, params);

            if (newUrl) history.push(newUrl);
        },
        [location, history]
    );

    const initialValues = {
        ...urlMatch.query,
        modifiedTime: urlMatch.query?.modifiedTime ? dateToForm(urlMatch.query?.modifiedTime) : undefined,
        createdTime: urlMatch.query?.createdTime ? dateToForm(urlMatch.query?.createdTime) : undefined
    };

    return <CreatorCandidateFilter onFinish={handleOnFinish} initialValues={initialValues} />;
}
