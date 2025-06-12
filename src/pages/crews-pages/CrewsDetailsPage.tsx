import React from "react";
import { RouteComponentProps } from "react-router";

import { CREW_DETAILS_PAGE_URL } from "urls";
import { PageURLNotMatch } from "shared";
import { ColumnsLayout, ContentWithHeaderFragment, DetailsPageLayout, SideMenuLayout } from "layout";
import { CrewDetailsContainer, CrewMembersContainer, CrewThumbnailsContainer } from "features/crews-moderation";
import { CrewChatContainer } from "features/crews-moderation/containers/CrewChatContainer";
import { CrewHeaderContainer } from "features/crews-moderation/containers/CrewHeaderContainer";
import { LiveChatContainer } from "features/chats-moderation";

export function CrewsDetailsPage(props: RouteComponentProps) {
    const urlMatch = CREW_DETAILS_PAGE_URL.match(props.location);

    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <CrewHeaderContainer />
                {!urlMatch.isMatched ? (
                    <PageURLNotMatch />
                ) : (
                    <DetailsPageLayout>
                        <ColumnsLayout>
                            <CrewDetailsContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                            <CrewMembersContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                        </ColumnsLayout>
                        <CrewThumbnailsContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                        <CrewChatContainer
                            stage={urlMatch.params.stage}
                            id={urlMatch.params.id}
                            renderChat={(chatId, getMemberTag) => (
                                <LiveChatContainer
                                    stage={urlMatch.params.stage}
                                    chatId={chatId}
                                    getMemberTag={getMemberTag}
                                />
                            )}
                        />
                    </DetailsPageLayout>
                )}
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}
