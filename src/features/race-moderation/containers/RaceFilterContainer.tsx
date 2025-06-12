import React from "react";
import { useHistory, useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";
import { useForm } from "antd/es/form/Form";

import { RaceListQueryParams } from "../services";
import { RaceFilterForm } from "../components/RaceFilterForm";

export interface RaceFilterContainerProps {
    url: UrlPath<{ stage: string }, RaceListQueryParams>;
}

export const RaceFilterContainer = ({ url }: RaceFilterContainerProps) => {
    const location = useLocation();
    const history = useHistory();
    const [form] = useForm<RaceListQueryParams>();

    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return null;

    const handleOnSearch = async () => {
        const params = await form.validateFields();
        const newUrl = url.replace(location, {}, params);

        if (newUrl) history.push(newUrl);
    };

    return <RaceFilterForm form={form} values={urlMatch.query || {}} onSearch={handleOnSearch} />;
};
