import React from "react";
import { useHistory, useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";
import { useForm } from "antd/es/form/Form";

import { UniverseListQueryParams } from "../services";
import { UniverseFilterForm } from "../components/UniverseFilterForm";

export interface UniverseFilterContainerProps {
    url: UrlPath<{ stage: string }, UniverseListQueryParams>;
}

export const UniverseFilterContainer = ({ url }: UniverseFilterContainerProps) => {
    const location = useLocation();
    const history = useHistory();
    const [form] = useForm<UniverseListQueryParams>();

    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return null;

    const handleOnSearch = async () => {
        const params = await form.validateFields();
        const newUrl = url.replace(location, {}, params);

        if (newUrl) history.push(newUrl);
    };

    return <UniverseFilterForm form={form} values={urlMatch.query || {}} onSearch={handleOnSearch} />;
};
