import React from "react";
import { Alert, Form } from "antd";
import { useHistory, useLocation } from "react-router";

import { VME_BACKGROUND_LIST_URL } from "urls";
import { VMEBackgroundQueryParams } from "../services";
import { VMEBackgroundFilterForm } from "../components/VMEBackgroundFilterForm";

export function VMEBackgroundFilterFormContainer() {
    const location = useLocation();
    const history = useHistory();
    const [form] = Form.useForm<VMEBackgroundQueryParams>();

    const urlMatch = VME_BACKGROUND_LIST_URL.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const handleOnSearch = async () => {
        const params = await form.validateFields();

        if (params.orderBy === "sortOrder" && typeof params.sortDirection === "undefined") params.sortDirection = "asc";

        const newUrl = VME_BACKGROUND_LIST_URL.replace(location, {}, params);

        if (newUrl) history.replace(newUrl);
    };

    const onChangeSortDirection = () =>
        history.replace(
            VME_BACKGROUND_LIST_URL.replace(
                location,
                {},
                { sortDirection: urlMatch.query?.sortDirection === "asc" ? "desc" : "asc" }
            )!
        );

    return (
        <VMEBackgroundFilterForm
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
