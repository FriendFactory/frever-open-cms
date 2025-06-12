import React from "react";
import { RouteComponentProps } from "react-router";

import { ColumnsLayout, ContentWithHeaderFragment, DetailsPageLayout, SideMenuLayout } from "layout";
import { ONBOARDING_DETAILS_PAGE_URL } from "urls";
import { PageURLNotMatch } from "shared";
import {
    QuestGroupDetailsHeaderContainer,
    QuestGroupDetailsInfoContainer,
    QuestGroupDetailsThumbnailContainer,
    QuestListContainer,
    RewardListContainer
} from "features/onboarding-moderation";

export function QuestGroupDetailsPage(props: RouteComponentProps) {
    const urlMatch = ONBOARDING_DETAILS_PAGE_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <QuestGroupDetailsHeaderContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />

                    <DetailsPageLayout>
                        <QuestGroupDetailsInfoContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                        <QuestGroupDetailsThumbnailContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />

                        <ColumnsLayout>
                            <QuestListContainer
                                stage={urlMatch.params.stage}
                                params={{ onboardingQuestGroupId: urlMatch.params.id }}
                            />
                            <RewardListContainer
                                stage={urlMatch.params.stage}
                                params={{ onboardingQuestGroupId: urlMatch.params.id }}
                            />
                        </ColumnsLayout>
                    </DetailsPageLayout>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}
