import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";

import { BotListQueryParams } from "../services";
import { BotFilterFields, BotFilterForm } from "../components/BotFilterForm";
import { Alert } from "antd";

export interface BotFilterFormContainerProps {
    url: UrlPath<{ stage: string }, BotListQueryParams>;
}

export function BotFilterFormContainer({ url }: BotFilterFormContainerProps) {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = url.match(location);
    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const handleChange = useCallback(
        (form: BotFilterFields) => {
            const newUrl = url.replace(location, {}, form);
            if (newUrl) history.push(newUrl);
        },
        [history, location]
    );

    return <BotFilterForm values={urlMatch.query || {}} onChange={handleChange} />;
}
