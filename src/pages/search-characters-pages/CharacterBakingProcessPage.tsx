import React from "react";
import { RouteComponentProps } from "react-router";

import { ColumnsLayout, ContentBlankLayout, ContentWithHeaderFragment, SideMenuLayout } from "layout";
import { CHARACTERS_BAKING_URL } from "urls";
import { PageHeader, PageURLNotMatch, StageSwitchTabsContainer } from "shared";
import { CharactersBakingInfoContainer, NonBakeableWardrobeList } from "features/characters-baking";

export function CharacterBakingProcessPage(props: RouteComponentProps) {
    const urlMatch = CHARACTERS_BAKING_URL.match(props.location);
    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader title="Characters Baking" withBackButton />
                    <StageSwitchTabsContainer url={CHARACTERS_BAKING_URL}>
                        <ContentBlankLayout padding={0}>
                            <ColumnsLayout>
                                <CharactersBakingInfoContainer url={CHARACTERS_BAKING_URL} />
                                <NonBakeableWardrobeList />
                            </ColumnsLayout>
                        </ContentBlankLayout>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}
