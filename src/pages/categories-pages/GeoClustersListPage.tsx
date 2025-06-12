import React from "react";
import { RouteComponentProps } from "react-router";

import { ListPagerContainer, PageErrorContainer, PageHeader, PageURLNotMatch, StageSwitchTabsContainer } from "shared";
import { ListLayoutFragment, ContentWithHeaderFragment, SideMenuLayout } from "layout";
import { GEO_CLUSTERS_LIST_URL, GEO_CLUSTER_LIST_DEFAULT_SIZE } from "urls";
import {
    GeoClustersListContainer,
    geoClustersListPageSelector,
    GeoClusterSearchFilterContainer
} from "features/categories-moderation";

function GeoClustersListPage(props: RouteComponentProps) {
    const urlMatch = GEO_CLUSTERS_LIST_URL.match(props.location);
    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader title="Geo Clusters" />
                    <StageSwitchTabsContainer url={GEO_CLUSTERS_LIST_URL}>
                        <ListLayoutFragment>
                            <GeoClusterSearchFilterContainer />
                            <PageErrorContainer
                                selector={geoClustersListPageSelector(urlMatch.params.stage, urlMatch.query || {})}>
                                <GeoClustersListContainer stage={urlMatch.params.stage} params={urlMatch.query} />
                            </PageErrorContainer>
                            <ListPagerContainer
                                url={GEO_CLUSTERS_LIST_URL}
                                selectorFactory={geoClustersListPageSelector}
                                defaultPageSize={GEO_CLUSTER_LIST_DEFAULT_SIZE}
                            />
                        </ListLayoutFragment>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

export default GeoClustersListPage;
