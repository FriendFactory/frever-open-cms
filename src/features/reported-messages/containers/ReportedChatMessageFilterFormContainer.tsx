import React from "react";
import { Alert, Form } from "antd";
import { useHistory, useLocation } from "react-router";

import { REPORTED_CHAT_MESSAGE_LIST_URL } from "urls";
import { dateToForm, dateToUrl } from "utils";
import {
    ReportedChatMessageFilterForm,
    ReportedChatMessageFilterFormFields
} from "../components/ReportedChatMessageFilterForm";
import { ReportedMessageListParams } from "../services";

export function ReportedChatMessageFilterFormContainer() {
    const [form] = Form.useForm<ReportedChatMessageFilterFormFields>();
    const location = useLocation();
    const history = useHistory();

    const urlMatch = REPORTED_CHAT_MESSAGE_LIST_URL.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const handleOnSearch = async () => {
        const params = await form.validateFields();
        const newUrl = REPORTED_CHAT_MESSAGE_LIST_URL.replace(location, {}, toUrlParams(params));
        if (newUrl) history.replace(newUrl);
    };

    return (
        <ReportedChatMessageFilterForm
            form={form}
            value={toFormValues(urlMatch.query || {})}
            onSearch={handleOnSearch}
        />
    );
}

const toFormValues = (params: ReportedMessageListParams): ReportedChatMessageFilterFormFields => ({
    ...params,
    date: params.date ? dateToForm(params.date) : undefined
});

const toUrlParams = (form: ReportedChatMessageFilterFormFields): ReportedMessageListParams => ({
    ...form,
    date: form.date ? dateToUrl(form.date) : undefined
});
