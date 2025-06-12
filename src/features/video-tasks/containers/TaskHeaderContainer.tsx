import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import { PageHeader } from "shared/components/PageHeader";
import { taskDetailsPageSelector } from "../store/reducer/taskDetails.reducer";
import { TASK_DETAILS_URL } from "urls";
import { Typography } from "antd";

export function TaskHeaderContainer() {
    const location = useLocation();

    const urlMatch = TASK_DETAILS_URL.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }

    const info = useSelector(taskDetailsPageSelector(urlMatch.params.stage, urlMatch.params.id));

    return (
        <PageHeader
            title={info.data?.name ?? ""}
            withBackButton
            extra={
                <Typography.Title level={3} type="secondary">
                    ID: {info.data?.id ?? "..."}
                </Typography.Title>
            }
        />
    );
}
