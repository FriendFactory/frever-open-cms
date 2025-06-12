import React from "react";

import { ContentWithHeaderFragment, ListLayoutFragment, SideMenuLayout } from "layout";
import { ListPagerContainer, PageHeader, StageSwitchTabsContainer } from "shared";
import { BOT_LIST_PAGE_URL, DEFAULT_BOT_LIST_PAGE_SIZE } from "urls";
import { BotFilterFormContainer, BotListContainer, botListPageSelector } from "features/bots-moderation";
import { CreateBotFormContainer } from "features/bots-moderation/containers/CreateBotFormContainer";
import { UserSearchWindow } from "features/user-moderation/containers/UserSearchWindow";
import { UserCardContainer } from "features/user-moderation/containers/UserCardContainer";
import { UserThumbnailContainer } from "features/user-moderation/containers/UserThumbnailContainer";

export function BotListPage() {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="Automated Accounts" />
                <StageSwitchTabsContainer url={BOT_LIST_PAGE_URL}>
                    <ListLayoutFragment>
                        <BotFilterFormContainer url={BOT_LIST_PAGE_URL} />
                        <BotListContainer
                            renderUserThumbnail={(bot) => <UserThumbnailContainer groupId={bot.groupId} />}
                            createBotComponent={
                                <CreateBotFormContainer
                                    userCardComponent={UserCardContainer}
                                    userSearchWindowComponent={UserSearchWindow}
                                />
                            }
                        />
                        <ListPagerContainer
                            url={BOT_LIST_PAGE_URL}
                            defaultPageSize={DEFAULT_BOT_LIST_PAGE_SIZE}
                            selectorFactory={botListPageSelector}
                        />
                    </ListLayoutFragment>
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}
