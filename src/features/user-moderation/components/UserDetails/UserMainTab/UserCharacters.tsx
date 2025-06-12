import React, { useCallback, useMemo } from "react";
import dayjs from "dayjs";
import { Card, Col, Row, Image, Typography } from "antd";
import styled from "styled-components";

import { Character, User } from "features/user-moderation/services";
import { createCdnURLFromFiles, ProtectedLink } from "shared";
import { CHARACTER_DETAILS_INFO_URL } from "urls";

const { Meta } = Card;
const { Text } = Typography;

export interface UserCharactersProps {
    stage: string;
    loading: boolean;
    user?: User;
}

export function UserCharacters({ stage, loading, user }: UserCharactersProps) {
    const charaList = useMemo(() => user?.character?.orderBy((chara) => chara.isDeleted) ?? [], [user]);

    const characterDescription = useCallback(
        (character: Character) => (
            <span>
                {character.id === user?.mainCharacterId ? (
                    <Text type="success">Default</Text>
                ) : character.isDeleted ? (
                    <Text type="danger">Deleted</Text>
                ) : null}
                <br />
                Character ID: <Typography.Text type="secondary">{character.id}</Typography.Text>
                <br />
                {dayjs.utc(character.createdTime).format("DD MMM YYYY HH:mm:ss")}
            </span>
        ),
        [user]
    );

    return (
        <div className="UserCharacters">
            <Card type="inner" title={`Characters (${charaList.length})`} loading={loading}>
                <Row gutter={[18, 18]} align="bottom">
                    {charaList.map((character) => (
                        <CharacterColStyled key={character.id}>
                            <ProtectedLink
                                feature="Social"
                                to={CHARACTER_DETAILS_INFO_URL.format({ stage, id: character.id })}>
                                <Card
                                    hoverable
                                    cover={
                                        <Image
                                            height="260px"
                                            preview={false}
                                            src={createCdnURLFromFiles({
                                                id: character.id,
                                                files: character.files ?? [],
                                                stage,
                                                entityType: "character",
                                                resolution: "512x512"
                                            })}
                                        />
                                    }>
                                    <Meta description={characterDescription(character)} />
                                </Card>
                            </ProtectedLink>
                        </CharacterColStyled>
                    ))}
                </Row>
            </Card>
        </div>
    );
}

const CharacterColStyled = styled(Col)`
    flex: 1 1 240px;
    max-width: 280px;

    img {
        object-fit: contain;
    }
`;
