import React from "react";
import { useHistory, useLocation } from "react-router";
import { useForm } from "antd/es/form/Form";
import { UrlPath } from "rd-url-utils";

import { ChatsMessageSearchFilterForm } from "features/chats-moderation/components/ChatMessageSearch/ChatsMessageSearchFilterForm";
import { ChatMessageSearchListQueryParams } from "features/chats-moderation";

export interface ChatsMessageSearchFilterContainerProps {
    url: UrlPath<{ stage: string }, ChatMessageSearchListQueryParams>;
}

export function ChatsMessageSearchFilterContainer({ url }: ChatsMessageSearchFilterContainerProps) {
    const location = useLocation();
    const history = useHistory();
    const [form] = useForm<ChatMessageSearchListQueryParams>();

    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return null;

    const handleOnSearch = async () => {
        const params = await form.validateFields();

        const newUrl = url.replace(location, {}, params);

        if (newUrl) history.replace(newUrl);
    };

    return <ChatsMessageSearchFilterForm form={form} initialValues={urlMatch.query || {}} onSearch={handleOnSearch} />;
}
