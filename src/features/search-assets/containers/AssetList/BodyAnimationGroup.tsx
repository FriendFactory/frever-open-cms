import React from "react";
import { useCurrentStage, useExtraData } from "shared";

interface BodyAnimationGroupProps {
    id: number | null;
}

export function BodyAnimationGroup({ id }: BodyAnimationGroupProps) {
    const stage = useCurrentStage();
    const groups = useExtraData({ stage, name: "BodyAnimationGroup" });

    if (groups.loading) return <span>...</span>;

    return <span>{id ? groups.data?.find((el) => el.id === id)?.name : null}</span>;
}
