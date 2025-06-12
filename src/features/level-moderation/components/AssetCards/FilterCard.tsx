import React from "react";
import { Card, Image } from "antd";

import { Item } from "./Item";
import { LevelEvent } from "features/level-moderation/services";
import { createCdnURLFromFiles, ProtectedLink } from "shared";
import { DETAILS_ASSET_URL } from "urls";
import { ReadinessTag } from "shared/components/ReadinessTag";

export interface FilterCardProps {
    stage: string;
    cameraFilterController: LevelEvent["cameraFilterController"];
}

export function FilterCard({ stage, cameraFilterController }: FilterCardProps) {
    return cameraFilterController?.length ? (
        <Card type="inner" bordered={false} title="Filter">
            {cameraFilterController.map((cameraFilterController) => {
                return (
                    <Item key={cameraFilterController.id}>
                        <Item.Thumbnail>
                            <Image
                                width={128}
                                src={createCdnURLFromFiles({
                                    id: cameraFilterController.cameraFilterVariant.id,
                                    files: cameraFilterController.cameraFilterVariant.files ?? [],
                                    stage,
                                    entityType: "CameraFilter",
                                    resolution: "512x512"
                                })}
                            />
                        </Item.Thumbnail>
                        <Item.Text label="Asset Type">Camera Filter</Item.Text>
                        <Item.Text label="ID">
                            {cameraFilterController.cameraFilterVariantId ? (
                                <ProtectedLink
                                    feature="AssetFull"
                                    to={DETAILS_ASSET_URL.format({
                                        stage,
                                        asset: "CameraFilter",
                                        id: cameraFilterController.cameraFilterVariantId
                                    })}>
                                    {cameraFilterController.cameraFilterVariantId}
                                </ProtectedLink>
                            ) : (
                                "Unknown"
                            )}
                        </Item.Text>
                        <Item.Text label="Readiness">
                            <ReadinessTag
                                stage={stage}
                                readinessId={cameraFilterController.cameraFilterVariant.readinessId}
                            />
                        </Item.Text>
                        <Item.Text label="Name">
                            {cameraFilterController.cameraFilterVariant.name ?? "Unknown"}
                        </Item.Text>
                        <Item.Text label="Value">{cameraFilterController.cameraFilterValue ?? "Unknown"}</Item.Text>
                        <Item.Text label="ActivationCue">{cameraFilterController.activationCue ?? "Unknown"}</Item.Text>
                        <Item.Text label="EndCue">{cameraFilterController.endCue ?? "Unknown"}</Item.Text>
                    </Item>
                );
            })}
        </Card>
    ) : null;
}
