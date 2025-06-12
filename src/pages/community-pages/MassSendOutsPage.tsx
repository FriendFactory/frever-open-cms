import React from "react";
import { RouteComponentProps } from "react-router";

import { ListPagerContainer, PageErrorContainer, PageHeader, PageURLNotMatch, StageSwitchTabsContainer } from "shared";
import { ContentWithHeaderFragment, ListLayoutFragment, SideMenuLayout } from "layout";
import { MASS_SEND_OUTS_LIST_PAGE_URL, SCHEDULED_MESSAGE_LIST_SIZE } from "urls";
import { scheduledMessageListPageSelector } from "features/community-moderation/store/reducer/scheduledMessage/scheduledMessageListReducer";
import { MassSendOutsListContainer, ScheduledMessageFilterFormContainer } from "features/community-moderation";

export function MassSendOutsPage(props: RouteComponentProps) {
    const urlMatch = MASS_SEND_OUTS_LIST_PAGE_URL.match(props.location);

    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="Mass Send Outs" />
                {!urlMatch.isMatched ? (
                    <PageURLNotMatch />
                ) : (
                    <StageSwitchTabsContainer url={MASS_SEND_OUTS_LIST_PAGE_URL}>
                        <ListLayoutFragment>
                            <ScheduledMessageFilterFormContainer url={MASS_SEND_OUTS_LIST_PAGE_URL} />

                            <PageErrorContainer
                                selector={scheduledMessageListPageSelector(
                                    urlMatch.params.stage,
                                    urlMatch.query || {}
                                )}>
                                <MassSendOutsListContainer
                                    stage={urlMatch.params.stage}
                                    params={urlMatch.query || {}}
                                />
                            </PageErrorContainer>

                            <ListPagerContainer
                                defaultPageSize={SCHEDULED_MESSAGE_LIST_SIZE}
                                url={MASS_SEND_OUTS_LIST_PAGE_URL}
                                selectorFactory={scheduledMessageListPageSelector}
                            />
                        </ListLayoutFragment>
                    </StageSwitchTabsContainer>
                )}
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}
