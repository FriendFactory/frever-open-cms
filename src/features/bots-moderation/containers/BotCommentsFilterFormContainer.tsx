import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";
import { Alert } from "antd";

import { BotCommentsFilterFields, BotCommentsFilterForm } from "../components/BotCommentsFilterForm";
import { BotCommentListQueryParams } from "../services";

export interface BotCommentsFilterFormContainerProps {
    url: UrlPath<{ stage: string }, BotCommentListQueryParams>;
}

export function BotCommentsFilterFormContainer({ url }: BotCommentsFilterFormContainerProps) {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = url.match(location);
    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const handleChange = useCallback(
        (form: BotCommentsFilterFields) => {
            const newUrl = url.replace(location, {}, form);
            if (newUrl) history.push(newUrl);
        },
        [history, location]
    );

    return <BotCommentsFilterForm values={urlMatch.query || {}} onChange={handleChange} />;
}
