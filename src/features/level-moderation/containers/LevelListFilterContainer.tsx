import React, { useCallback } from "react";
import { UrlPath } from "rd-url-utils";
import { useHistory, useLocation } from "react-router";

import { LevelListQueryParams } from "../services";
import { LevelListFilter, LevelListFilterFields } from "../components";
import { dateToForm, dateToUrl } from "utils";

export interface LevelListFilterContainerProps {
    url: UrlPath<{ stage: string }, any>;
}

export function LevelListFilterContainer({ url }: LevelListFilterContainerProps) {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = url.match(location);
    if (!urlMatch.isMatched) return null;

    const handleChange = useCallback(
        (form: LevelListFilterFields) => {
            const params = toUrlParams(form);

            const newUrl = url.replace(
                location,
                {},
                {
                    ...params,
                    skip: 0
                }
            );

            if (newUrl) history.replace(newUrl);
        },
        [history, location]
    );

    const values = toFormValues(urlMatch.query || {});

    return <LevelListFilter value={values} onChange={handleChange} />;
}

const toFormValues = (params: LevelListQueryParams): LevelListFilterFields => ({
    ...params,
    createdTime: params.createdTime ? dateToForm(params.createdTime) : undefined,
    modifiedTime: params.modifiedTime ? dateToForm(params.modifiedTime) : undefined
});

const toUrlParams = (form: LevelListFilterFields): LevelListQueryParams => ({
    ...form,
    createdTime: form.createdTime ? dateToUrl(form.createdTime) : undefined,
    modifiedTime: form.modifiedTime ? dateToUrl(form.modifiedTime) : undefined
});
