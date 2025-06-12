import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "antd";

import { PageHeader } from "shared/components/PageHeader";
import { editorSettingsPageSelector } from "features/categories-moderation/store/reducer";

export interface HeaderContainerProps {
    stage: string;
    id: number;
}
export function HeaderContainer({ stage, id }: HeaderContainerProps) {
    const info = useSelector(editorSettingsPageSelector(stage, id));

    return (
        <PageHeader
            title={info.data?.name ? info.data?.name : info.loading ? "..." : "??"}
            extra={<Typography.Title level={3} type="secondary">{`ID: ${id}`}</Typography.Title>}
            withBackButton
        />
    );
}
