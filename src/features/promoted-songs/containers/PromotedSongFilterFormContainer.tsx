import React from "react";
import { Alert, Form } from "antd";
import { useHistory, useLocation } from "react-router";

import { PROMOTED_SONG_LIST_URL } from "urls";
import { PromotedSongListQueryParams } from "../services";
import { PromotedSongFilterForm, PromotedSongFilterFormFields } from "../components/PromotedSongFilterForm";

export function PromotedSongFilterFormContainer() {
    const [form] = Form.useForm<PromotedSongFilterFormFields>();
    const location = useLocation();
    const history = useHistory();

    const urlMatch = PROMOTED_SONG_LIST_URL.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const handleOnSearch = async () => {
        const params = await form.validateFields();
        const newUrl = PROMOTED_SONG_LIST_URL.replace(location, {}, toUrlParams(params));
        if (newUrl) history.replace(newUrl);
    };

    return <PromotedSongFilterForm form={form} value={toFormValues(urlMatch.query || {})} onSearch={handleOnSearch} />;
}

const toFormValues = (params: PromotedSongListQueryParams): PromotedSongFilterFormFields => ({
    ...params
});

const toUrlParams = (form: PromotedSongFilterFormFields): PromotedSongListQueryParams => ({
    ...form
});
