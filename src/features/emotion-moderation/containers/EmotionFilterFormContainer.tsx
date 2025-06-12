import React from "react";
import { Alert, Form } from "antd";
import { useHistory, useLocation } from "react-router";

import { EMOTIONS_LIST_URL } from "urls";
import { EmotionsQueryParams } from "../services";
import { EmotionFilterForm } from "../components/EmotionFilterForm";

export function EmotionFilterFormContainer() {
    const location = useLocation();
    const history = useHistory();
    const [form] = Form.useForm<EmotionsQueryParams>();

    const urlMatch = EMOTIONS_LIST_URL.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const handleOnSearch = async () => {
        const params = await form.validateFields();

        if (params.orderBy === "sortOrder" && typeof params.sortDirection === "undefined") {
            params.sortDirection = "asc";
        }

        const newUrl = EMOTIONS_LIST_URL.replace(location, {}, params);

        if (newUrl) {
            history.replace(newUrl);
        }
    };

    const onChangeSortDirection = () =>
        history.replace(
            EMOTIONS_LIST_URL.replace(
                location,
                {},
                { sortDirection: urlMatch.query?.sortDirection === "asc" ? "desc" : "asc" }
            )!
        );

    return (
        <EmotionFilterForm
            form={form}
            initialValues={{
                orderBy: urlMatch.query?.orderBy ?? "id",
                sortDirection: urlMatch.query?.sortDirection ?? "desc",
                ...urlMatch.query
            }}
            onChangeSortDirection={onChangeSortDirection}
            onSearch={handleOnSearch}
        />
    );
}
