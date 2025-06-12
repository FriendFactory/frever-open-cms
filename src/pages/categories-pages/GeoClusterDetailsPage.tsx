import React from "react";

import { ContentBlankLayout, ContentWithHeaderFragment, SideMenuLayout } from "layout";
import { GEO_CLUSTER_DETAILS_URL } from "urls";
import { RouteComponentProps } from "react-router";
import { PageErrorContainer, PageURLNotMatch } from "shared";
import { GeoClusterHeaderContainer, GeoClusterInfoContainer } from "features/categories-moderation";
import { geoClustersDetailsPageSelector } from "features/categories-moderation/store/reducer/geoClusters/geoClustersDetailsPageReducer";

function GeoClusterDetailsPage(props: RouteComponentProps) {
    const urlMatch = GEO_CLUSTER_DETAILS_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <GeoClusterHeaderContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                    <ContentBlankLayout>
                        <PageErrorContainer
                            selector={geoClustersDetailsPageSelector(urlMatch.params.stage, urlMatch.params.id)}>
                            <GeoClusterInfoContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                        </PageErrorContainer>
                    </ContentBlankLayout>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

export default GeoClusterDetailsPage;
