import React from "react";
import { Card, Image } from "antd";

import { Item } from "./Item";
import { LevelEvent } from "features/level-moderation/services";
import { createCdnURLFromFiles, ProtectedLink } from "shared";
import { DETAILS_ASSET_URL } from "urls";

export interface CameraCardProps {
    stage: string;
    cameraController: LevelEvent["cameraController"];
}

export function CameraCard({ stage, cameraController }: CameraCardProps) {
    return cameraController?.length ? (
        <Card type="inner" bordered={false} title="Camera">
            {cameraController.map((camera) => {
                return (
                    <Item key={camera.id}>
                        <Item.Thumbnail>
                            <Image
                                width={128}
                                src={createCdnURLFromFiles({
                                    id: camera.cameraAnimationTemplateId,
                                    files: camera.cameraAnimationTemplate.files ?? [],
                                    stage,
                                    entityType: "CameraAnimationTemplate",
                                    resolution: "512x512"
                                })}
                            />
                        </Item.Thumbnail>
                        <Item.Text label="Asset Type">Camera Animation</Item.Text>
                        <Item.Text label="Asset ID">
                            {camera.cameraAnimationTemplateId ? (
                                <ProtectedLink
                                    feature="AssetFull"
                                    to={DETAILS_ASSET_URL.format({
                                        stage,
                                        asset: "CameraAnimationTemplate",
                                        id: camera.cameraAnimationTemplateId
                                    })}>
                                    {camera.cameraAnimationTemplateId}
                                </ProtectedLink>
                            ) : (
                                "Unknown"
                            )}
                        </Item.Text>
                        <Item.Text label="Range">{camera.startFocusDistance ?? "Unknown"}</Item.Text>
                        <Item.Text label="Follow">{camera.followAll ?? "Unknown"}</Item.Text>
                        <Item.Text label="ActivationCue">{camera.activationCue ?? "Unknown"}</Item.Text>
                        <Item.Text label="EndCue">{camera.endCue ?? "Unknown"}</Item.Text>
                    </Item>
                );
            })}
        </Card>
    ) : null;
}
