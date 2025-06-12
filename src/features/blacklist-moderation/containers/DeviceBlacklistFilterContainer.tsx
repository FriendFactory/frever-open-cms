import React from "react";
import { useHistory, useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";
import { useForm } from "antd/es/form/Form";

import { DeviceBlacklistQueryParams } from "../services";
import { DeviceBlacklistFilterForm } from "../components/DeviceBlacklistFilterForm";

export interface DeviceBlacklistFilterContainerProps {
    url: UrlPath<{ stage: string }, DeviceBlacklistQueryParams>;
}

export const DeviceBlacklistFilterContainer = ({ url }: DeviceBlacklistFilterContainerProps) => {
    const location = useLocation();
    const history = useHistory();
    const [form] = useForm<DeviceBlacklistQueryParams>();

    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return null;

    const handleOnSearch = async () => {
        const params = await form.validateFields();
        const newUrl = url.replace(location, {}, params);

        if (newUrl) history.push(newUrl);
    };

    return <DeviceBlacklistFilterForm form={form} values={urlMatch.query || {}} onSearch={handleOnSearch} />;
};
