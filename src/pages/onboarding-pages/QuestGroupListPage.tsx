import React from "react";
import { RouteComponentProps } from "react-router";

import { ONBOARDING_QUEST_GROUP_LIST_PAGE_SIZE, ONBOARDING_QUEST_GROUP_LIST_PAGE_URL } from "urls";
import { ListPagerContainer, PageErrorContainer, PageHeader, PageURLNotMatch, StageSwitchTabsContainer } from "shared";
import { ContentWithHeaderFragment, ListLayoutFragment, SideMenuLayout } from "layout";
import {
    onboardingEntityPagerSelector,
    onboardingEntityPageSelector,
    QuestGroupFilterFormContainer,
    QuestGroupListContainer
} from "features/onboarding-moderation";

export function QuestGroupListPage(props: RouteComponentProps) {
    const urlMatch = ONBOARDING_QUEST_GROUP_LIST_PAGE_URL.match(props.location);

    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="Quest Group" />
                <StageSwitchTabsContainer url={ONBOARDING_QUEST_GROUP_LIST_PAGE_URL}>
                    {!urlMatch.isMatched ? (
                        <PageURLNotMatch />
                    ) : (
                        <ListLayoutFragment>
                            <QuestGroupFilterFormContainer url={ONBOARDING_QUEST_GROUP_LIST_PAGE_URL} />
                            <PageErrorContainer
                                selector={onboardingEntityPageSelector(
                                    urlMatch.params.stage,
                                    urlMatch.query || {},
                                    "questGroup"
                                )}>
                                <QuestGroupListContainer stage={urlMatch.params.stage} params={urlMatch.query || {}} />
                            </PageErrorContainer>
                            <ListPagerContainer
                                defaultPageSize={ONBOARDING_QUEST_GROUP_LIST_PAGE_SIZE}
                                url={ONBOARDING_QUEST_GROUP_LIST_PAGE_URL}
                                selectorFactory={onboardingEntityPagerSelector}
                                extraSelectFactoryArgs={["questGroup"]}
                            />
                        </ListLayoutFragment>
                    )}
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}
