import React from "react";
import { Alert, Form } from "antd";
import { useHistory, useLocation } from "react-router";

import { BACKGROUND_AI_LIST_URL } from "urls";
import { BackgroundAIQueryParams } from "features/vme-backgrounds/services/BackgroundAI/getBackgroundsAI";
import { BackgroundAIFilterFormForm } from "features/vme-backgrounds/components/BackgroundAI/BackgroundAIFilterForm";

export function BackgroundAIFilterFormContainer() {
    const location = useLocation();
    const history = useHistory();
    const [form] = Form.useForm<BackgroundAIQueryParams>();

    const urlMatch = BACKGROUND_AI_LIST_URL.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const handleOnSearch = async () => {
        const params = await form.validateFields();

        if (params.orderBy === "sortOrder" && typeof params.sortDirection === "undefined") params.sortDirection = "asc";

        const newUrl = BACKGROUND_AI_LIST_URL.replace(location, {}, params);

        if (newUrl) history.replace(newUrl);
    };

    const onChangeSortDirection = () =>
        history.replace(
            BACKGROUND_AI_LIST_URL.replace(
                location,
                {},
                { sortDirection: urlMatch.query?.sortDirection === "asc" ? "desc" : "asc" }
            )!
        );

    return (
        <BackgroundAIFilterFormForm
            form={form}
            initialValues={{
                orderBy: urlMatch.query?.orderBy ?? "id",
                sortDirection: urlMatch.query?.sortDirection ?? "desc",
                isEnabled: urlMatch.query?.isEnabled ?? "true",
                ...urlMatch.query
            }}
            onChangeSortDirection={onChangeSortDirection}
            onSearch={handleOnSearch}
        />
    );
}
