import React from "react";
import { useHistory, useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";
import { useForm } from "antd/es/form/Form";
import { CreatePageRowQueryParams } from "../services";
import { CreatePageRowFilterForm } from "../components/CreatePageRowFilterForm";

export interface CreatePageRowFilterContainerProps {
    url: UrlPath<{ stage: string }, CreatePageRowQueryParams>;
}

export const CreatePageRowFilterContainer = ({ url }: CreatePageRowFilterContainerProps) => {
    const location = useLocation();
    const history = useHistory();
    const [form] = useForm<CreatePageRowQueryParams>();

    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return null;

    const handleOnSearch = async () => {
        const params = await form.validateFields();
        const newUrl = url.replace(location, {}, params);

        if (newUrl) history.push(newUrl);
    };

    return <CreatePageRowFilterForm form={form} values={urlMatch.query || {}} onSearch={handleOnSearch} />;
};
