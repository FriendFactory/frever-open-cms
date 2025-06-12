import React from "react";
import { Card } from "antd";

import { TAG_LIST_PAGE_URL } from "urls";
import { ProtectedLink } from "shared/containers";

export interface TagsCardProps {
    stage: string;
    children: React.ReactChild;
    loading: boolean;
}

export function TagsCard({ stage, children, loading }: TagsCardProps) {
    if (!stage) {
        return null;
    }

    return (
        <Card
            title="Tags"
            loading={loading}
            extra={
                <ProtectedLink feature="AssetFull" to={TAG_LIST_PAGE_URL.format({ stage })}>
                    All tags
                </ProtectedLink>
            }>
            {children}
        </Card>
    );
}
