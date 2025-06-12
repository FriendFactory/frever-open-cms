import React, { useCallback } from "react";
import { UrlPath } from "rd-url-utils";
import { useHistory, useLocation } from "react-router";
import { Alert } from "antd";

import { GetUserPhotoParams } from "../../services";
import { UserPhotoListFilter, UserPhotoListFilterFields } from "../../components/UserPhotoListFilter";
import { dateToForm, dateToUrl } from "utils";

export interface UserPhotoListFilterContainerProps {
    url: UrlPath<{ stage: string }, GetUserPhotoParams>;
}

export function UserPhotoListFilterContainer({ url }: UserPhotoListFilterContainerProps) {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = url.match(location);
    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const handleChange = useCallback(
        (form: UserPhotoListFilterFields) => {
            const params = toUrlParams(form);
            const newUrl = url.replace(location, {}, { ...params, skip: 0 });
            if (newUrl) history.push(newUrl);
        },
        [history, location]
    );

    const values = toFormValues(urlMatch.query || {});

    return <UserPhotoListFilter value={values} onChange={handleChange} />;
}

const toFormValues = (params: GetUserPhotoParams): UserPhotoListFilterFields => ({
    ...params,
    createdTime: params.createdTime ? dateToForm(params.createdTime) : undefined,
    modifiedTime: params.modifiedTime ? dateToForm(params.modifiedTime) : undefined
});

const toUrlParams = (form: UserPhotoListFilterFields): GetUserPhotoParams => ({
    ...form,
    createdTime: form.createdTime ? dateToUrl(form.createdTime) : undefined,
    modifiedTime: form.modifiedTime ? dateToUrl(form.modifiedTime) : undefined
});
