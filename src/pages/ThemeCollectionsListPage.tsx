import React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import { DEFAULT_THEME_COLLECTIONS_LIST_SIZE, THEME_COLLECTIONS_LIST_URL } from "urls";
import { StageSwitchTabsContainer, PageHeader, ListPagerContainer, PageURLNotMatch, PageErrorContainer } from "shared";
import { ContentWithHeaderFragment, SideMenuLayout, ListLayoutFragment } from "layout";
import {
    themeCollectionListPageSelector,
    SortableThemeCollectionListContainer,
    ThemeCollectionFilterFormContainer
} from "features/theme-collections";

export function ThemeCollectionsListPage(props: RouteComponentProps) {
    const urlMatch = THEME_COLLECTIONS_LIST_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader
                        title="Theme Collections"
                        extra={
                            <Link
                                to={THEME_COLLECTIONS_LIST_URL.format(
                                    { stage: urlMatch.params.stage },
                                    { orderBy: "sortOrder", sortDirection: "asc" }
                                )}>
                                Sorting mode
                            </Link>
                        }
                    />
                    <StageSwitchTabsContainer url={THEME_COLLECTIONS_LIST_URL} cacheResetBtn>
                        <ListLayoutFragment>
                            <ThemeCollectionFilterFormContainer />
                            <PageErrorContainer
                                selector={themeCollectionListPageSelector(urlMatch.params.stage, urlMatch.query || {})}>
                                <SortableThemeCollectionListContainer
                                    stage={urlMatch.params.stage}
                                    params={urlMatch.query}
                                />
                            </PageErrorContainer>
                            <ListPagerContainer
                                defaultPageSize={DEFAULT_THEME_COLLECTIONS_LIST_SIZE}
                                url={THEME_COLLECTIONS_LIST_URL}
                                selectorFactory={themeCollectionListPageSelector}
                            />
                        </ListLayoutFragment>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}
