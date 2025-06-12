import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router";
import { Alert } from "antd";
import { UrlPath } from "rd-url-utils";

import { dateToForm, dateToUrl } from "utils";
import { CommentsFilterForm, CommentFilterFormInitialValues } from "../components/CommentsFilterForm";
import { VideoCommentsQueryParams } from "../services";

export interface CommentsFilterFormContainerProps {
    url: UrlPath<{ stage: string }, VideoCommentsQueryParams>;
    withGroupFilter?: boolean;
    withVideoFilter?: boolean;
}

export function CommentsFilterFormContainer({ url, ...restProps }: CommentsFilterFormContainerProps) {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const handleOnChange = useCallback(
        (form: CommentFilterFormInitialValues) => {
            const params = toUrlParams(form);
            const newUrl = url.replace(location, {}, { ...params, skip: 0 });
            if (newUrl) history.replace(newUrl);
        },
        [history, location]
    );

    const values = toFormValues(urlMatch.query || {});
    return <CommentsFilterForm values={values} onChange={handleOnChange} {...restProps} />;
}

const toFormValues = (params: VideoCommentsQueryParams): CommentFilterFormInitialValues => ({
    ...params,
    filter: "contains",
    time: params.time ? dateToForm(params.time) : undefined
});

const toUrlParams = (form: CommentFilterFormInitialValues): VideoCommentsQueryParams => ({
    ...form,
    filter: form.text ? form.filter : undefined,
    time: form.time ? dateToUrl(form.time) : undefined
});
