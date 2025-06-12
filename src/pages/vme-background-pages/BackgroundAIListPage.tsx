import React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { BACKGROUND_AI_LIST_URL, DEFAULT_BACKGROUND_AI_LIST_SIZE } from "urls";
import { StageSwitchTabsContainer, PageHeader, PageURLNotMatch, ListPagerContainer, PageErrorContainer } from "shared";
import { ContentWithHeaderFragment, SideMenuLayout, ListLayoutFragment } from "layout";
import { BackgroundAIFilterFormContainer, backgroundAIListSelector } from "features/vme-backgrounds";
import { SortableBackgroundAIListContainer } from "features/vme-backgrounds/containers/BackgroundAI/SortableBackgroundAIListContainer";

export function BackgroundAIListPage(props: RouteComponentProps) {
    const urlMatch = BACKGROUND_AI_LIST_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader
                        title="AI Background"
                        extra={
                            <Link
                                to={BACKGROUND_AI_LIST_URL.format(
                                    { stage: urlMatch.params.stage },
                                    { orderBy: "sortOrder", sortDirection: "asc" }
                                )}>
                                Sorting mode
                            </Link>
                        }
                    />
                    <StageSwitchTabsContainer url={BACKGROUND_AI_LIST_URL}>
                        <ListLayoutFragment>
                            <BackgroundAIFilterFormContainer />
                            <PageErrorContainer
                                selector={backgroundAIListSelector(urlMatch.params.stage, urlMatch.query || {})}>
                                <SortableBackgroundAIListContainer
                                    stage={urlMatch.params.stage}
                                    params={urlMatch.query}
                                />
                            </PageErrorContainer>
                            <ListPagerContainer
                                defaultPageSize={DEFAULT_BACKGROUND_AI_LIST_SIZE}
                                url={BACKGROUND_AI_LIST_URL}
                                selectorFactory={backgroundAIListSelector}
                            />
                        </ListLayoutFragment>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}
