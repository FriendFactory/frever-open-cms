import React from "react";

import { ListPagerContainer, StageSwitchTabsContainer, PageHeader } from "shared";
import { EXCHANGE_OFFERS_BASE_PAGE_SIZE, EXCHANGE_OFFERS_URL } from "urls";
import { SideMenuLayout, ListLayoutFragment, ContentWithHeaderFragment } from "layout";
import {
    ExchangeOffersSearchFormContainer,
    ExchangeOffersContainer,
    exchangeOffersPageSelector
} from "features/banking-moderation";

export function ExchangeOffersPage() {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="Exchange Offers" />
                <StageSwitchTabsContainer url={EXCHANGE_OFFERS_URL}>
                    <ListLayoutFragment>
                        <ExchangeOffersSearchFormContainer />
                        <ExchangeOffersContainer />
                        <ListPagerContainer
                            url={EXCHANGE_OFFERS_URL}
                            selectorFactory={exchangeOffersPageSelector}
                            defaultPageSize={EXCHANGE_OFFERS_BASE_PAGE_SIZE}
                        />
                    </ListLayoutFragment>
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}
