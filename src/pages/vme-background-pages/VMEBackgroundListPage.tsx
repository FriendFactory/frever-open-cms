import React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { DEFAULT_VME_BACKGROUND_LIST_SIZE, VME_BACKGROUND_LIST_URL } from "urls";
import { StageSwitchTabsContainer, PageHeader, PageURLNotMatch, ListPagerContainer, PageErrorContainer } from "shared";
import { ContentWithHeaderFragment, SideMenuLayout, ListLayoutFragment } from "layout";
import {
    SortableVMEBackgroundListContainer,
    VMEBackgroundFilterFormContainer,
    vmeBackgroundListSelector
} from "features/vme-backgrounds";

export function VMEBackgroundListPage(props: RouteComponentProps) {
    const urlMatch = VME_BACKGROUND_LIST_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader
                        title="VME Background"
                        extra={
                            <Link
                                to={VME_BACKGROUND_LIST_URL.format(
                                    { stage: urlMatch.params.stage },
                                    { orderBy: "sortOrder", sortDirection: "asc" }
                                )}>
                                Sorting mode
                            </Link>
                        }
                    />
                    <StageSwitchTabsContainer url={VME_BACKGROUND_LIST_URL}>
                        <ListLayoutFragment>
                            <VMEBackgroundFilterFormContainer />
                            <PageErrorContainer
                                selector={vmeBackgroundListSelector(urlMatch.params.stage, urlMatch.query || {})}>
                                <SortableVMEBackgroundListContainer
                                    stage={urlMatch.params.stage}
                                    params={urlMatch.query}
                                />
                            </PageErrorContainer>
                            <ListPagerContainer
                                defaultPageSize={DEFAULT_VME_BACKGROUND_LIST_SIZE}
                                url={VME_BACKGROUND_LIST_URL}
                                selectorFactory={vmeBackgroundListSelector}
                            />
                        </ListLayoutFragment>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}
