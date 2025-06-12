import React from "react";
import { RouteComponentProps } from "react-router";

import { TEMPLATE_DETAILS_URL } from "urls";
import { PageErrorContainer, PageURLNotMatch } from "shared";
import { ColumnsLayout, DetailsPageLayout, SideMenuLayout, ContentWithHeaderFragment } from "layout";
import {
    TemplateHeaderContainer,
    TemplateInfoContainer,
    TemplateTagsContainer,
    TemplateVideoPlayerContainer,
    templatePageSelector
} from "features/video-templates";

export function TemplateDetailsPage(props: RouteComponentProps) {
    const urlMatch = TEMPLATE_DETAILS_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <TemplateHeaderContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                    <PageErrorContainer selector={templatePageSelector(urlMatch.params.stage, urlMatch.params.id)}>
                        <DetailsPageLayout reversed sideBlockWidth={400}>
                            <ColumnsLayout>
                                <TemplateInfoContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                                <TemplateTagsContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                            </ColumnsLayout>
                            <TemplateVideoPlayerContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                        </DetailsPageLayout>
                    </PageErrorContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}
