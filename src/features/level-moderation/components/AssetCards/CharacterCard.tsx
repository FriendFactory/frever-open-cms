import React from "react";
import { Card, Image } from "antd";

import { Item } from "./Item";
import { createCdnURLFromFiles, ProtectedLink } from "shared";
import { CHARACTER_DETAILS_INFO_URL } from "urls";
import { LevelEvent } from "features/level-moderation/services";
import { ReadinessTag } from "shared/components/ReadinessTag";

export interface CharacterCardProps {
    characterController: LevelEvent["characterController"];
    stage: string;
}

export function CharacterCard({ characterController, stage }: CharacterCardProps) {
    return characterController?.length ? (
        <Card type="inner" bordered={false} title="Character">
            {characterController.map((charaController) => (
                <Item key={charaController.id}>
                    <Item.Thumbnail>
                        <Image
                            width={128}
                            src={createCdnURLFromFiles({
                                id: charaController.characterId,
                                files: charaController.character?.files ?? [],
                                stage,
                                entityType: "character",
                                resolution: "512x512"
                            })}
                        />
                    </Item.Thumbnail>
                    <Item.Text label="Character ID">
                        {charaController.characterId ? (
                            <ProtectedLink
                                feature="Social"
                                to={CHARACTER_DETAILS_INFO_URL.format({
                                    stage,
                                    id: charaController.characterId
                                })}>
                                {charaController.characterId}
                            </ProtectedLink>
                        ) : (
                            "Unknown"
                        )}
                    </Item.Text>
                    <Item.Text label="Readiness">
                        {charaController.character?.readinessId ? (
                            <ReadinessTag stage={stage} readinessId={charaController.character.readinessId} />
                        ) : (
                            "Unknown"
                        )}
                    </Item.Text>
                    <Item.Text label="Name">{charaController.character?.name ?? "Unknown"}</Item.Text>
                    <Item.Text label="Outfit ID">{charaController.outfitId ?? "None"}</Item.Text>
                    <Item.Text label="ActivationCue">{charaController.activationCue ?? "Unknown"}</Item.Text>
                    <Item.Text label="EndCue">{charaController.endCue ?? "Unknown"}</Item.Text>
                </Item>
            ))}
        </Card>
    ) : null;
}
