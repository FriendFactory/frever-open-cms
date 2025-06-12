import React from "react";
import { Avatar, Button, Col, Divider, List, Row, Switch, theme } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { createCdnURLFromFiles } from "shared";
import { USER_DETAILS_INFO_URL } from "urls";
import { useExtraData } from "shared/hooks/useExtraData";
import { Character } from "features/user-moderation/services";
import { CharacterSearchModalContainer } from "../containers/CharacterSearchModalContainer";
import { CharacterReplacement } from "../services";

export interface CharacterReplacementListProps {
    stage: string;
    characterReplacement: CharacterReplacement[];
    removeReplaceCharacter: (item: CharacterReplacement) => void;
    createHandleOnCharacterClick: (item: CharacterReplacement) => (character: Character) => void;
    selectMainCharacter: (item: CharacterReplacement) => void;
}

export function CharacterReplacementList({
    stage,
    characterReplacement,
    removeReplaceCharacter,
    createHandleOnCharacterClick,
    selectMainCharacter
}: CharacterReplacementListProps) {
    return (
        <List
            itemLayout="horizontal"
            dataSource={characterReplacement}
            renderItem={(item, index) => (
                <>
                    <RowWrapper gutter={[10, 10]} align="middle">
                        <Col span={12}>
                            <List.Item>
                                <CharacterReplacementListItemMeta
                                    stage={stage}
                                    characterId={item.originalCharacterId}
                                    character={item.originalCharacter}
                                />
                                <DoubleRightOutlined />
                            </List.Item>
                        </Col>

                        <Col span={12}>
                            {item.replaceCharacterId ? (
                                <List.Item>
                                    <CharacterReplacementListItemMeta
                                        stage={stage}
                                        characterId={item.replaceCharacterId}
                                        character={item.replaceCharacter}
                                    />
                                    <Button type="text" danger onClick={() => removeReplaceCharacter(item)}>
                                        Remove
                                    </Button>
                                </List.Item>
                            ) : (
                                <Row justify="space-between" gutter={[24, 24]} wrap={false} align="middle">
                                    <Col>
                                        <CharacterSearchModalContainer
                                            stage={stage}
                                            onCharacterClick={createHandleOnCharacterClick(item)}>
                                            <Button disabled={item.replaceWithMainCharacter} type="dashed">
                                                Replace with
                                            </Button>
                                        </CharacterSearchModalContainer>
                                    </Col>
                                    <Col>or</Col>
                                    <Col>
                                        Main Character:{"  "}
                                        <Switch
                                            checked={item.replaceWithMainCharacter}
                                            onChange={() => selectMainCharacter(item)}
                                        />
                                    </Col>
                                </Row>
                            )}
                        </Col>
                    </RowWrapper>
                    {characterReplacement.length - 1 !== index && <Divider />}
                </>
            )}
        />
    );
}

export function CharacterReplacementListItemMeta({
    stage,
    character,
    characterId
}: {
    stage: string;
    character?: Character | null;
    characterId: number;
}) {
    const gender = useExtraData({ stage, name: "Gender" });

    return (
        <List.Item.Meta
            avatar={
                character && (
                    <Avatar
                        shape="square"
                        size={60}
                        src={createCdnURLFromFiles({
                            stage,
                            id: character.id,
                            resolution: "128x128",
                            files: character.files,
                            entityType: "Character"
                        })}
                    />
                )
            }
            title={"ID: " + characterId}
            description={
                character && (
                    <span>
                        {gender.data?.find((el) => el.id === character.genderId)?.name}
                        <br />
                        <Link
                            target="_blank"
                            to={USER_DETAILS_INFO_URL.format({
                                stage,
                                selector: "mainGroupId",
                                id: character.groupId
                            })}>
                            Group: {character.groupId}
                        </Link>
                    </span>
                )
            }
        />
    );
}

const RowWrapper = styled(Row)`
    @media (max-width: ${() => theme.useToken().token.screenLGMax}px) {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;

        .ant-list-item-meta {
            display: flex;
            flex-direction: column;
            align-items: center !important;
        }
        .ant-list-item-meta-content {
            width: auto !important;
        }
        .ant-row {
            display: flex;
            flex-direction: column;
            .ant-col {
                display: flex;
                gap: 3px;
                flex-wrap: wrap;
                justify-content: center;
            }
        }
    }
`;
