import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";

import { UserFilterForm, UserFilterFields } from "../components/UserFilterForm";
import { GetUserListParams } from "../services/getUserList";
import { dateToForm, dateToUrl } from "utils";
import { LoadingContainer, useExtraDataBundle } from "shared";

export interface UserFilterFormContainer {
    url: UrlPath<{ stage: string }, any>;
}

export function UserFilterFormContainer({ url }: UserFilterFormContainer) {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return null;

    const info = useExtraDataBundle(["Country", "Language"]);

    const handleChange = useCallback(
        (form: UserFilterFields) => {
            const params = toUserListUrlParams(form);
            const newUrl = url.replace(location, {}, { ...params, skip: 0 });
            if (newUrl) history.replace(newUrl);
        },
        [history, location]
    );

    const values = toUserFilterFormValues(urlMatch.query || {});

    return !info.loading ? (
        <UserFilterForm
            value={values}
            countries={info.bundle.Country?.data}
            languages={info.bundle.Language?.data}
            onChange={handleChange}
        />
    ) : (
        <LoadingContainer loading />
    );
}

export const toUserFilterFormValues = (params: GetUserListParams): UserFilterFields => ({
    ...params,
    filter: params.filter ?? "contains",
    date: params.date ? dateToForm(params.date) : undefined
});

export const toUserListUrlParams = (form: UserFilterFields): GetUserListParams => ({
    ...form,
    date: form.date ? dateToUrl(form.date) : undefined
});
