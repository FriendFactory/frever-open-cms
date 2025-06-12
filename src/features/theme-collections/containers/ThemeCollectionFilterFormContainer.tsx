import React from "react";
import { Alert, Form } from "antd";
import { useHistory, useLocation } from "react-router";

import { THEME_COLLECTIONS_LIST_URL } from "urls";
import { ThemeCollectionsQueryParams } from "../services";
import { ThemeCollectionFilterForm } from "../components/ThemeCollectionFilterForm";

export function ThemeCollectionFilterFormContainer() {
    const location = useLocation();
    const history = useHistory();
    const [form] = Form.useForm<ThemeCollectionsQueryParams>();

    const urlMatch = THEME_COLLECTIONS_LIST_URL.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const handleOnSearch = async () => {
        const params = await form.validateFields();

        if (params.orderBy === "sortOrder" && typeof params.sortDirection === "undefined") {
            params.sortDirection = "asc";
        }

        const newUrl = THEME_COLLECTIONS_LIST_URL.replace(location, {}, params);

        if (newUrl) {
            history.replace(newUrl);
        }
    };

    const onChangeSortDirection = () =>
        history.replace(
            THEME_COLLECTIONS_LIST_URL.replace(
                location,
                {},
                { sortDirection: urlMatch.query?.sortDirection === "asc" ? "desc" : "asc" }
            )!
        );

    return (
        <ThemeCollectionFilterForm
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
