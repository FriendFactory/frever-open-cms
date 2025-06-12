import React from "react";
import { RouteComponentProps } from "react-router";

import { TAG_LIST_PAGE_URL } from "urls";
import { StageSwitchTabsContainer, PageHeader, PageURLNotMatch } from "shared";
import { SideMenuLayout, ContentWithHeaderFragment, ListLayoutFragment } from "layout";
import { TagFilterFormContainer, TagListContainer } from "features/tag-moderation";

export function TagListPage(props: RouteComponentProps) {
    const urlMatch = TAG_LIST_PAGE_URL.match(props.location);
    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader title="Tags" />
                    <StageSwitchTabsContainer url={TAG_LIST_PAGE_URL}>
                        <ListLayoutFragment>
                            <TagFilterFormContainer url={TAG_LIST_PAGE_URL} />
                            <TagListContainer url={TAG_LIST_PAGE_URL} />
                        </ListLayoutFragment>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}
