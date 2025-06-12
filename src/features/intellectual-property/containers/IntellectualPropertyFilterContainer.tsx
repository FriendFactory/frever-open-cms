import React from "react";
import { useHistory, useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";
import { useForm } from "antd/es/form/Form";

import { IntellectualPropertyQueryParams } from "../services";
import { IntellectualPropertyFilterForm } from "../components/IntellectualPropertyFilterForm";

export interface IntellectualPropertyFilterContainerProps {
    url: UrlPath<{ stage: string }, IntellectualPropertyQueryParams>;
}

export const IntellectualPropertyFilterContainer = ({ url }: IntellectualPropertyFilterContainerProps) => {
    const location = useLocation();
    const history = useHistory();
    const [form] = useForm<IntellectualPropertyQueryParams>();

    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return null;

    const handleOnSearch = async () => {
        const params = await form.validateFields();
        const newUrl = url.replace(location, {}, params);

        if (newUrl) history.push(newUrl);
    };

    return <IntellectualPropertyFilterForm form={form} values={urlMatch.query || {}} onSearch={handleOnSearch} />;
};
