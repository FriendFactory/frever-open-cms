import React from "react";
import { Card, Col, Row, Typography } from "antd";

import { Character } from "features/user-moderation/services";
import { USER_DETAILS_INFO_URL, CHARACTER_DETAILS_DNA_EDITOR_URL } from "urls";
import { ProtectedLink } from "shared";

const { Text } = Typography;

const colArgs = { xs: 24, md: 12, xxl: 8 };

export interface CharacterMainInfoProps {
    stage: string;
    loading: boolean;
    isBakeable: boolean;
    character?: Character;
}

export function CharacterMainInfo({ stage, loading, isBakeable, character }: CharacterMainInfoProps) {
    return (
        <Card
            title="Information"
            className="CharacterMainInfo__information-card"
            loading={loading}
            extra={
                character?.id && (
                    <ProtectedLink
                        feature="Social"
                        to={CHARACTER_DETAILS_DNA_EDITOR_URL.format({ stage, id: character.id })}>
                        DNA Editor
                    </ProtectedLink>
                )
            }>
            <Row gutter={[16, 16]} justify="start">
                <Col {...colArgs}>Character ID: {character?.id ?? "Unknown"}</Col>
                <Col {...colArgs}>
                    User ID:{" "}
                    {character?.uploaderUserId ? (
                        <ProtectedLink
                            feature="Social"
                            to={USER_DETAILS_INFO_URL.format({
                                stage,
                                selector: "id",
                                id: character.uploaderUserId
                            })}>
                            {character.uploaderUserId}
                        </ProtectedLink>
                    ) : (
                        "Unknown"
                    )}
                </Col>
                <Col {...colArgs}>
                    Group ID:{" "}
                    {character?.groupId ? (
                        <ProtectedLink
                            feature="Social"
                            to={USER_DETAILS_INFO_URL.format({
                                stage,
                                selector: "mainGroupId",
                                id: character.groupId
                            })}>
                            {character.groupId}
                        </ProtectedLink>
                    ) : (
                        "Unknown"
                    )}
                </Col>
                <Col {...colArgs}>
                    Is Default:{" "}
                    {character?.isMainCharacter ? <Text type="success">Yes</Text> : <Text type="danger">No</Text>}
                </Col>
                <Col {...colArgs}>Outfit ID: {character?.defaultOutfitId ?? "Unknown"}</Col>
                <Col {...colArgs}>Gender ID: {character?.genderId ?? "Unknown"}</Col>
                <Col {...colArgs}>Style ID: {character?.characterStyleId ?? "Unknown"}</Col>
                <Col {...colArgs}>UMARecipe ID: {character?.characterAndUmaRecipe?.[0]?.umaRecipeId ?? ""}</Col>
                <Col {...colArgs}>
                    Is Bakeable:{" "}
                    <Typography.Text type={isBakeable ? "success" : "danger"}>
                        {isBakeable ? "Yes" : "No"}
                    </Typography.Text>
                </Col>
                <Col span={24}>Version: {character?.version ?? "Unknown"}</Col>
            </Row>
        </Card>
    );
}
