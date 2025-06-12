import React, { useCallback } from "react";

import { UrlPath } from "rd-url-utils";
import { useHistory, useLocation } from "react-router";
import { UserVideoClipFilter, UserVideoClipFilterFields } from "features/user-media/components/UserVideoClipFilter";

import { GetUserVideoClipParams } from "features/user-media/services";
import { Alert } from "antd";
import { dateToForm, dateToUrl } from "utils";

export interface UserVideoClipListFilterContainerProps {
    url: UrlPath<{ stage: string }, GetUserVideoClipParams>;
}

export function UserVideoClipListFilterContainer({ url }: UserVideoClipListFilterContainerProps) {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = url.match(location);
    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const handleChange = useCallback(
        (form: UserVideoClipFilterFields) => {
            const params = toUrlParams(form);
            const newUrl = url.replace(location, {}, { ...params, skip: 0 });
            if (newUrl) history.replace(newUrl);
        },
        [history, location]
    );

    const values = toFormValues(urlMatch.query || {});
    return <UserVideoClipFilter value={values} onChange={handleChange} />;
}

const toFormValues = (params: GetUserVideoClipParams): UserVideoClipFilterFields => ({
    ...params,
    createdTime: params.createdTime ? dateToForm(params.createdTime) : undefined
});

const toUrlParams = (form: UserVideoClipFilterFields): GetUserVideoClipParams => ({
    ...form,
    createdTime: form.createdTime ? dateToUrl(form.createdTime) : undefined
});
