import React, { useCallback } from "react";
import { UrlPath } from "rd-url-utils";
import { useHistory, useLocation } from "react-router";

import { dateToForm, dateToUrl } from "utils";
import { OutfitListQueryParams } from "../services";
import { OutfitListFilterParams, UserOutfitListFilter } from "../components/UserOutfitListFilter";

export interface UserOutfitListFilterContainerProps {
    url: UrlPath<{ stage: string }, any>;
}

export function UserOutfitListFilterContainer({ url }: UserOutfitListFilterContainerProps) {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = url.match(location);
    if (!urlMatch.isMatched) return null;

    const handleChange = useCallback(
        (form: OutfitListFilterParams) => {
            const newUrl = url.replace(location, {}, { ...toOutfitUrlParams(form), skip: 0 });
            if (newUrl) history.push(newUrl);
        },
        [history, location]
    );

    const values = toOutfitFilterFormValues(urlMatch.query || {});
    return <UserOutfitListFilter values={values} onChange={handleChange} />;
}

export const toOutfitFilterFormValues = (params: OutfitListQueryParams): OutfitListFilterParams => ({
    ...params,
    createdTime: params.createdTime ? dateToForm(params.createdTime) : undefined,
    modifiedTime: params.modifiedTime ? dateToForm(params.modifiedTime) : undefined
});

export const toOutfitUrlParams = (form: OutfitListFilterParams): OutfitListQueryParams => ({
    ...form,
    createdTime: form.createdTime ? dateToUrl(form.createdTime) : undefined,
    modifiedTime: form.modifiedTime ? dateToUrl(form.modifiedTime) : undefined
});
