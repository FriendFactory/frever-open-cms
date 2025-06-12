import React from "react";
import { Card, Image } from "antd";

import { Item } from "./Item";
import { createCdnURLFromFiles, ProtectedLink } from "shared";
import { DETAILS_ASSET_URL } from "urls";
import { LevelEvent } from "features/level-moderation/services";
import { ReadinessTag } from "shared/components/ReadinessTag";

export interface VFXCardProps {
    stage: string;
    vfxController?: LevelEvent["vfxController"];
}

export function VFXCard({ stage, vfxController }: VFXCardProps) {
    return vfxController?.length ? (
        <Card type="inner" bordered={false} title="VFX">
            {vfxController.map((vfxContrl) => (
                <Item key={vfxContrl.id}>
                    <Item.Thumbnail>
                        <Image
                            width={128}
                            src={createCdnURLFromFiles({
                                id: vfxContrl.vfxId,
                                files: vfxContrl.vfx.files ?? [],
                                stage,
                                entityType: "VFX",
                                resolution: "512x512"
                            })}
                        />
                    </Item.Thumbnail>
                    <Item.Text label="Asset Type">VFX</Item.Text>
                    <Item.Text label="Asset ID">
                        {vfxContrl.vfxId ? (
                            <ProtectedLink
                                feature="AssetFull"
                                to={DETAILS_ASSET_URL.format({ stage, asset: "VFX", id: vfxContrl.vfxId })}>
                                {vfxContrl.vfxId}
                            </ProtectedLink>
                        ) : (
                            "Unknown"
                        )}
                    </Item.Text>
                    <Item.Text label="Readiness">
                        <ReadinessTag stage={stage} readinessId={vfxContrl.vfx.readinessId} />
                    </Item.Text>
                    <Item.Text label="Name">{vfxContrl.vfx.name ?? "Unknown"}</Item.Text>
                    <Item.Text label="AnimationSpeed">{vfxContrl.animationSpeed ?? "Unknown"}</Item.Text>
                    <Item.Text label="ActivationCue">{vfxContrl.activationCue ?? "Unknown"}</Item.Text>
                    <Item.Text label="EndCue">{vfxContrl.endCue ?? "Unknown"}</Item.Text>
                </Item>
            ))}
        </Card>
    ) : null;
}
