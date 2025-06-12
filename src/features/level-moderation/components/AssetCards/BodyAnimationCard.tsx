import React from "react";
import { Card, Image } from "antd";

import { Item } from "./Item";
import { createCdnURLFromFiles, ProtectedLink } from "shared";
import { DETAILS_ASSET_URL } from "urls";
import { CharacterController } from "features/level-moderation/services";
import { ReadinessTag } from "shared/components/ReadinessTag";

export interface BodyAnimationCardProps {
    stage: string;
    characterControllerBodyAnimation: CharacterController["characterControllerBodyAnimation"];
}

export function BodyAnimationCard({ stage, characterControllerBodyAnimation }: BodyAnimationCardProps) {
    return characterControllerBodyAnimation.length ? (
        <Card type="inner" bordered={false} title="Body Animation">
            {characterControllerBodyAnimation.map((charaBA) => (
                <Item key={charaBA.id}>
                    <Item.Thumbnail>
                        <Image
                            width={128}
                            src={createCdnURLFromFiles({
                                id: charaBA.primaryBodyAnimationId,
                                files: charaBA.primaryBodyAnimation?.files ?? [],
                                stage,
                                entityType: "BodyAnimation",
                                resolution: "512x512"
                            })}
                        />
                    </Item.Thumbnail>
                    <Item.Text label="Asset Type">BodyAnimation</Item.Text>
                    <Item.Text label="Asset ID">
                        {charaBA.primaryBodyAnimationId ? (
                            <ProtectedLink
                                feature="AssetFull"
                                to={DETAILS_ASSET_URL.format({
                                    stage,
                                    asset: "BodyAnimation",
                                    id: charaBA.primaryBodyAnimationId
                                })}>
                                {charaBA.primaryBodyAnimationId}
                            </ProtectedLink>
                        ) : (
                            "Unknown"
                        )}
                    </Item.Text>
                    <Item.Text label="Readiness">
                        <ReadinessTag stage={stage} readinessId={charaBA.primaryBodyAnimation?.readinessId} />
                    </Item.Text>
                    <Item.Text label="Name">{charaBA.primaryBodyAnimation?.name ?? "Unknown"}</Item.Text>
                    <Item.Text label="ActivationCue">{charaBA.activationCue ?? "Unknown"}</Item.Text>
                    <Item.Text label="EndCue">{charaBA.endCue ?? "Unknown"}</Item.Text>
                </Item>
            ))}
        </Card>
    ) : null;
}
