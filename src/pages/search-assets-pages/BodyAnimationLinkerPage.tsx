import React from "react";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";

import { ContentWithHeaderFragment, SideMenuLayout, ListLayoutFragment } from "layout";
import { StageSwitchTabsContainer, PageHeader } from "shared";
import { BODY_ANIMATION_LINKER_URL, SEARCH_ASSET_URL } from "urls";
import {
    PaginatorContainer,
    BodyAnimationListContainer,
    SearchContainer,
    CharaSpawnPosListContainer,
    BodyAnimationLinkerContainer
} from "features/search-assets";

export interface BodyAnimationLinkerPageProps {
    match: { params: { stage: string } };
}

export function BodyAnimationLinkerPage({ match: { params } }: BodyAnimationLinkerPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader
                    title="Body Animation Linker"
                    extra={
                        <Link to={SEARCH_ASSET_URL.format({ stage: params.stage, asset: "BodyAnimation" })}>List</Link>
                    }
                />
                <StageSwitchTabsContainer url={BODY_ANIMATION_LINKER_URL}>
                    <Row gutter={[0, 24]}>
                        <Col span={24}>
                            <BodyAnimationLinkerContainer />
                        </Col>
                        <Col span={24}>
                            <Row gutter={[24, 24]}>
                                <Col xs={24} md={12}>
                                    <ListLayoutFragment>
                                        <SearchContainer searchFor="bodyAnimSearch" />
                                        <BodyAnimationListContainer />
                                        <PaginatorContainer skipFor="bodyAnimSkip" />
                                    </ListLayoutFragment>
                                </Col>
                                <Col xs={24} md={12}>
                                    <ListLayoutFragment>
                                        <SearchContainer searchFor="charSpawnPosSearch" />
                                        <CharaSpawnPosListContainer />
                                        <PaginatorContainer skipFor="charSpawnPosSkip" />
                                    </ListLayoutFragment>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}
