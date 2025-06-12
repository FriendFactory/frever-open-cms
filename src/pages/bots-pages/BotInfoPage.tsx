import React from "react";
import { useParams } from "react-router";

import { ColumnsLayout, ContentBlankLayout, ContentWithHeaderFragment, SideMenuLayout } from "layout";
import { PageHeader } from "shared";
import { BOT_DETAILS_PAGE_URL } from "urls";
import { BotFormContainer } from "features/bots-moderation/containers/BotFormContainer";
import { UserCardContainer } from "features/user-moderation/containers/UserCardContainer";
import { UserSearchWindow } from "features/user-moderation/containers/UserSearchWindow";
import { BotCommentsContainer } from "features/bots-moderation/containers/BotCommentsContainer";
import { BotCommentsCardContainer } from "features/bots-moderation/containers/BotCommentsCardContainer";
import { botCommentListByBotId, botInfoPageSelector } from "features/bots-moderation";

export function BotInfoPage() {
    const params = useParams() as unknown as typeof BOT_DETAILS_PAGE_URL.paramType;

    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title={"Bot " + params.id} withBackButton />
                <ContentBlankLayout>
                    <ColumnsLayout>
                        <BotFormContainer
                            userCardComponent={UserCardContainer}
                            userSearchWindowComponent={UserSearchWindow}
                        />
                        <BotCommentsCardContainer selectorFactory={botInfoPageSelector(params.stage, params.id)}>
                            <BotCommentsContainer selectorFactory={botCommentListByBotId(params.stage, params.id)} />
                        </BotCommentsCardContainer>
                    </ColumnsLayout>
                </ContentBlankLayout>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}
