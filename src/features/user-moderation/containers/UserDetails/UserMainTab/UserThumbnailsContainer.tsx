import React from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Card, Col, Empty, Row } from "antd";

import { USER_DETAILS_INFO_URL } from "urls";
import { ThumbnailCardContainer } from "features/search-characters/containers/CharacterDetails/ThumbnailCardContainer";
import { userDetailsPageSelector } from "features/user-moderation/store/reducer/user/userDetailsReducer";

export interface UserThumbnailsContainerProps {}

export function UserThumbnailsContainer({}: UserThumbnailsContainerProps) {
    const location = useLocation();
    const urlMatch = USER_DETAILS_INFO_URL.match(location);

    if (!urlMatch.isMatched) {
        return <div></div>;
    }

    const info = useSelector(userDetailsPageSelector(urlMatch.params));

    if (!info.data && !info.loading) {
        return null;
    }

    const character = info.data?.mainCharacter;
    return (
        <Card loading={!info.data && info.loading} title="Profile">
            {character ? (
                <Row gutter={[0, 16]}>
                    {character.files
                        .sort((a, b) => Number(b.resolution.split("x")?.[0]) - Number(a.resolution.split("x")?.[0]))
                        .map((file, index) => (
                            <Col key={index + file.version} span={24}>
                                <ThumbnailCardContainer
                                    stage={urlMatch.params.stage}
                                    characterId={character.id}
                                    thumbnailFile={file}
                                />
                            </Col>
                        ))}
                </Row>
            ) : (
                <Empty />
            )}
        </Card>
    );
}
