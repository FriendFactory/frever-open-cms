import React from "react";
import { Card, Image } from "antd";

import { Item } from "./Item";
import { createCdnURLFromFiles, ProtectedLink } from "shared";
import { DETAILS_ASSET_URL } from "urls";
import { LevelEvent } from "features/level-moderation/services";
import { ReadinessTag } from "shared/components/ReadinessTag";

export interface SetLocationCardProps {
    stage: string;
    setLocationController?: LevelEvent["setLocationController"];
}

export function SetLocationCard({ stage, setLocationController }: SetLocationCardProps) {
    return setLocationController?.length ? (
        <Card type="inner" bordered={false} title="Scenery">
            {setLocationController.map((setLocationController) => (
                <Item key={setLocationController.id}>
                    <Item.Thumbnail>
                        <Image
                            width={128}
                            src={createCdnURLFromFiles({
                                id: setLocationController.setLocationId,
                                files: setLocationController.setLocation.files ?? [],
                                stage,
                                entityType: "SetLocation",
                                resolution: "512x512"
                            })}
                        />
                    </Item.Thumbnail>
                    <Item.Text label="Asset Type">SetLocation</Item.Text>
                    <Item.Text label="Asset ID">
                        {setLocationController.setLocationId ? (
                            <ProtectedLink
                                feature="AssetFull"
                                to={DETAILS_ASSET_URL.format({
                                    stage,
                                    asset: "SetLocation",
                                    id: setLocationController.setLocationId
                                })}>
                                {setLocationController.setLocationId}
                            </ProtectedLink>
                        ) : (
                            "Unknown"
                        )}
                    </Item.Text>
                    <Item.Text label="Readiness">
                        <ReadinessTag stage={stage} readinessId={setLocationController.setLocation.readinessId} />
                    </Item.Text>
                    <Item.Text label="Name">{setLocationController.setLocation.name ?? "Unknown"}</Item.Text>
                    <Item.Text label="Time of Day">{setLocationController.timeOfDay ?? "Unknown"}</Item.Text>
                    <Item.Text label="ActivationCue">{setLocationController.activationCue ?? "Unknown"}</Item.Text>
                    <Item.Text label="EndCue">{setLocationController.endCue ?? "Unknown"}</Item.Text>
                </Item>
            ))}
        </Card>
    ) : null;
}
