import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";
import { Alert } from "antd";

import { ScheduledMessageQueryParams } from "features/community-moderation/services/scheduledMessage/getScheduledMessage";
import {
    ScheduledMessageFilterForm,
    ScheduledMessageFilterFormFields
} from "features/community-moderation/components/MassSendOuts/ScheduledMessageFilterForm";
import { dateToForm, dateToUrl } from "utils";

export interface ScheduledMessageFilterFormContainerProps {
    url: UrlPath<{ stage: string }, ScheduledMessageQueryParams>;
}

export function ScheduledMessageFilterFormContainer({ url }: ScheduledMessageFilterFormContainerProps) {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = url.match(location);
    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const handleChange = useCallback(
        (form: ScheduledMessageFilterFormFields) => {
            const newUrl = url.replace(location, {}, { ...toOUrlParams(form), skip: 0 });
            if (newUrl) history.push(newUrl);
        },
        [history, location]
    );
    const values = toFormValues(urlMatch.query || {});
    return <ScheduledMessageFilterForm values={values} onChange={handleChange} />;
}

export const toFormValues = (params: ScheduledMessageQueryParams): ScheduledMessageFilterFormFields => ({
    ...params,
    scheduledForTime: params.scheduledForTime ? dateToForm(params.scheduledForTime) : undefined
});

export const toOUrlParams = (form: ScheduledMessageFilterFormFields): ScheduledMessageQueryParams => ({
    ...form,
    scheduledForTime: form.scheduledForTime ? dateToUrl(form.scheduledForTime) : undefined
});
