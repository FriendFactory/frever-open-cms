import React from "react";

import { StageSwitchTabsContainer, PageHeader } from "shared";
import { IN_APP_PRICE_TIERS_URL } from "urls";
import { SideMenuLayout, ContentWithHeaderFragment } from "layout";
import { InAppPriceTierListContainer } from "features/banking-moderation";

export interface InAppPriceTiersPageProps {
    match: { params: { stage: string } };
}

export function InAppPriceTiersPage({ match: { params } }: InAppPriceTiersPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="Price Tiers" />
                <StageSwitchTabsContainer url={IN_APP_PRICE_TIERS_URL}>
                    <InAppPriceTierListContainer stage={params.stage} />
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}
