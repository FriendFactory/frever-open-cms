import React, { useMemo } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Card, Col, Empty, Row } from "antd";

import { CHARACTER_DETAILS_INFO_URL } from "urls";
import { characterDetailsSelector } from "../../store";
import { ThumbnailCardContainer } from "./ThumbnailCardContainer";

export interface CharacterThumbnailListContainerProps {}

export function CharacterThumbnailListContainer({}: CharacterThumbnailListContainerProps) {
    const location = useLocation();
    const urlMatch = CHARACTER_DETAILS_INFO_URL.match(location);

    if (!urlMatch.isMatched) {
        return <div></div>;
    }

    const info = useSelector(characterDetailsSelector(urlMatch.params.stage, urlMatch.params.id));

    if (!info.data && !info.loading) {
        return null;
    }

    const files = useMemo(
        () =>
            info.data?.files.sort((a, b) => {
                const [widthA] = a.resolution.split("x");
                const [widthB] = b.resolution.split("x");
                return Number(widthB) - Number(widthA);
            }),
        [info.data, urlMatch.params.stage, urlMatch.params.id]
    );

    return (
        <Card loading={!info.data && info.loading}>
            {files ? (
                <Row gutter={[0, 16]}>
                    {files.map((file) => (
                        <Col key={file.version} span={24}>
                            <ThumbnailCardContainer
                                stage={urlMatch.params.stage}
                                characterId={urlMatch.params.id}
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
