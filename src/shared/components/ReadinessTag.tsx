import React from "react";
import { Tag } from "antd";

import { useExtraData } from "shared/hooks/useExtraData";
import { readinessColor } from "shared";

export interface ReadinessTagProps {
    stage: string;
    readinessId: number;
}

export function ReadinessTag({ stage, readinessId }: ReadinessTagProps) {
    const readinessList = useExtraData({ stage, name: "Readiness" });
    return (
        <Tag color={readinessColor[readinessId]}>
            {readinessList.data?.find((readiness) => readiness.id === readinessId)?.name ?? "Unknown"}
        </Tag>
    );
}
