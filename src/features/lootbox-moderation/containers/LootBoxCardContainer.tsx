import React from "react";
import { Link } from "react-router-dom";

import { createCdnURLFromFiles, useCurrentStage } from "shared";
import { ThumbnailCard } from "shared/components/ThumbnailCard";
import { useLootBoxData } from "../hooks/useLootBoxData";

export interface LootBoxCardContainerProps {
    lootBoxId: number;
    markers?: React.ReactNode[];
    width?: number;
}

export function LootBoxCardContainer({ width, lootBoxId, markers = [] }: LootBoxCardContainerProps) {
    const stage = useCurrentStage();
    const { info: lootBoxData } = useLootBoxData({ params: {} });
    const entity = lootBoxData.data?.find((lootBox) => lootBox.id === lootBoxId);

    const imageUrl =
        entity && "files" in entity
            ? createCdnURLFromFiles({
                  id: lootBoxId,
                  files: entity.files,
                  entityType: "LootBox",
                  stage,
                  resolution: "256x256"
              })
            : "/assets/no-image.png";

    return (
        <ThumbnailCard
            width={width}
            aspectRatio="inherit"
            imageUrl={imageUrl}
            transform={"scale(1.1)"}
            markers={[...markers, <Link to={"#"}>{`${entity?.title}`}</Link>]}
        />
    );
}
