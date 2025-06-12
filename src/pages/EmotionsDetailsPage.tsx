import React from "react";
import { RouteComponentProps } from "react-router";

import { PageURLNotMatch } from "shared";
import { EMOTIONS_DETAILS_URL } from "urls";
import { EmotionAssetListContainer } from "features/search-assets";
import { DetailsPageHeaderContainer, EmotionFormContainer } from "features/emotion-moderation";
import { ColumnsLayout, ContentBlankLayout, ContentWithHeaderFragment, SideMenuLayout } from "layout";

export function EmotionsDetailsPage(props: RouteComponentProps) {
    const urlMatch = EMOTIONS_DETAILS_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <DetailsPageHeaderContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                    <ContentBlankLayout>
                        <ColumnsLayout>
                            <EmotionFormContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                            <EmotionAssetListContainer
                                stage={urlMatch.params.stage}
                                emotionId={String(urlMatch.params.id)}
                            />
                        </ColumnsLayout>
                    </ContentBlankLayout>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}
