import React, { useCallback } from "react";
import { UrlPath } from "rd-url-utils";
import { useHistory, useLocation } from "react-router";
import { Alert } from "antd";

import { GetUserSoundParams } from "../../services";
import { UserSoundListFilter, UserSoundListFilterFields } from "../../components/UserSoundListFilter";
import { dateToForm, dateToUrl } from "utils";

export interface UserSoundListFilterContainerProps {
    url: UrlPath<{ stage: string }, GetUserSoundParams>;
}

export function UserSoundListFilterContainer({ url }: UserSoundListFilterContainerProps) {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = url.match(location);
    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const handleChange = useCallback(
        (form: UserSoundListFilterFields) => {
            const params = toUrlParams(form);
            const newUrl = url.replace(location, {}, { ...params, skip: 0 });
            if (newUrl) history.push(newUrl);
        },
        [history, location]
    );

    const values = toFormValues(urlMatch.query || {});

    return <UserSoundListFilter value={values} onChange={handleChange} />;
}

const toFormValues = (params: GetUserSoundParams): UserSoundListFilterFields => ({
    ...params,
    createdTime: params.createdTime ? dateToForm(params.createdTime) : undefined
});

const toUrlParams = (form: UserSoundListFilterFields): GetUserSoundParams => ({
    ...form,
    createdTime: form.createdTime ? dateToUrl(form.createdTime) : undefined
});
