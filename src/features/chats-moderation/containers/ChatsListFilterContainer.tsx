import React from "react";
import { Alert } from "antd";
import { useHistory, useLocation } from "react-router";

import { CHATS_LIST_PAGE_URL } from "urls";
import { ChatsListFilterForm } from "../components/ChatsListFilterForm";
import { useForm } from "antd/es/form/Form";
import { ChatListQueryParams } from "../services";

export function ChatsListFilterContainer() {
    const location = useLocation();
    const history = useHistory();
    const [form] = useForm<ChatListQueryParams>();

    const urlMatch = CHATS_LIST_PAGE_URL.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const handleOnSearch = async () => {
        const params = await form.validateFields();

        const newUrl = CHATS_LIST_PAGE_URL.replace(location, {}, params);

        if (newUrl) history.replace(newUrl);
    };

    return <ChatsListFilterForm form={form} initialValues={urlMatch.query || {}} onSearch={handleOnSearch} />;
}
