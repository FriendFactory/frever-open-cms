import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button } from "antd";
import { FireOutlined } from "@ant-design/icons";

import { DEFAULT_CHARACTER_LIST_PAGE_SIZE, CHARACTER_LIST_URL, CHARACTERS_BAKING_URL } from "urls";
import { ListPagerContainer, StageSwitchTabsContainer, PageHeader, PageURLNotMatch } from "shared";
import { ContentWithHeaderFragment, ListLayoutFragment, SideMenuLayout } from "layout";
import {
    characterListPageSelector,
    CharacterListContainer,
    CharacterFilterContainer
} from "features/search-characters";

export function CharacterListPage(props: RouteComponentProps) {
    const urlMatch = CHARACTER_LIST_URL.match(props.location);
    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader
                        title="All Characters"
                        extra={
                            <Button size="large" type="link">
                                <Link
                                    to={CHARACTERS_BAKING_URL.format({
                                        stage: urlMatch.params.stage
                                    })}>
                                    Characters Baking <FireOutlined />
                                </Link>
                            </Button>
                        }
                    />
                    <StageSwitchTabsContainer url={CHARACTER_LIST_URL}>
                        <ListLayoutFragment>
                            <CharacterFilterContainer url={CHARACTER_LIST_URL} />
                            <CharacterListContainer />
                            <ListPagerContainer
                                defaultPageSize={DEFAULT_CHARACTER_LIST_PAGE_SIZE}
                                url={CHARACTER_LIST_URL}
                                selectorFactory={characterListPageSelector}
                            />
                        </ListLayoutFragment>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}
