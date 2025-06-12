import React from "react";
import { Alert, Form } from "antd";
import { useHistory, useLocation } from "react-router";
import dayjs from "dayjs";

import { CREWS_LIST_PAGE_URL } from "urls";
import { CrewFilterForm, CrewFilterFormFields } from "../components/CrewFilterForm";
import { URL_DATE_FORMAT, useExtraData } from "shared";
import { CrewListQueryParams } from "../services";

export function CrewFilterFormContainer() {
    const [form] = Form.useForm<CrewFilterFormFields>();
    const location = useLocation();
    const history = useHistory();

    const urlMatch = CREWS_LIST_PAGE_URL.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const languages = useExtraData({ stage: urlMatch.params.stage, name: "Language" });

    const handleOnSearch = async () => {
        const params = await form.validateFields();
        const newUrl = CREWS_LIST_PAGE_URL.replace(location, {}, toUrlParams(params));
        if (newUrl) history.replace(newUrl);
    };

    return (
        <CrewFilterForm
            form={form}
            value={toFormValues(urlMatch.query || {})}
            onSearch={handleOnSearch}
            languages={languages}
        />
    );
}

const toFormValues = (params: CrewListQueryParams): CrewFilterFormFields => ({
    ...params,
    messagesTime: params.messagesTime ? dayjs.utc(params.messagesTime, URL_DATE_FORMAT) : undefined
});

const toUrlParams = (form: CrewFilterFormFields): CrewListQueryParams => ({
    ...form,
    messagesTime: form.messagesTime ? form.messagesTime.format(URL_DATE_FORMAT) : undefined
});
