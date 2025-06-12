import React from "react";
import { useHistory, useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";
import { useForm } from "antd/es/form/Form";

import { WatermarkListQueryParams } from "../services";
import { WatermarkFilterForm } from "../components/WatermarkFilterForm";

export interface WatermarkListFilterContainerProps {
    url: UrlPath<{ stage: string }, WatermarkListQueryParams>;
}

export const WatermarkListFilterContainer = ({ url }: WatermarkListFilterContainerProps) => {
    const location = useLocation();
    const history = useHistory();
    const [form] = useForm<WatermarkListQueryParams>();

    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return null;

    const handleOnSearch = async () => {
        const params = await form.validateFields();
        const newUrl = url.replace(location, {}, params);

        if (newUrl) history.push(newUrl);
    };

    return <WatermarkFilterForm form={form} values={urlMatch.query || {}} onSearch={handleOnSearch} />;
};
