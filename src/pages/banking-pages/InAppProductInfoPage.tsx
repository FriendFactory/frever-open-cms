import React from "react";

import { SideMenuLayout, ContentWithHeaderFragment, DetailsPageLayout } from "layout";
import {
    InAppProductFormContainer,
    SpecialOfferListContainer,
    InAppProductThumbnailsContainer,
    InAppProductInfoHeaderContainer
} from "features/banking-moderation";

export interface InAppProductInfoPageProps {
    match: { params: { stage: string; id: number } };
}

export function InAppProductInfoPage({ match: { params } }: InAppProductInfoPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <InAppProductInfoHeaderContainer stage={params.stage} id={params.id} />
                <DetailsPageLayout>
                    <InAppProductFormContainer stage={params.stage} id={params.id} />
                    <InAppProductThumbnailsContainer stage={params.stage} id={params.id} />
                    <SpecialOfferListContainer stage={params.stage} id={params.id} />
                </DetailsPageLayout>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}
