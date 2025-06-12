import React from "react";

import { ListPagerContainer, StageSwitchTabsContainer, PageHeader } from "shared";
import { SideMenuLayout, ListLayoutFragment, ContentWithHeaderFragment } from "layout";
import { IN_APP_PRODUCTS_BASE_PAGE_SIZE, IN_APP_PRODUCT_LIST_URL } from "urls";
import {
    InAppProductListContainer,
    inAppProductListPageSelector,
    InAppProductListFilterContainer
} from "features/banking-moderation";

export interface InAppProductListPageProps {}

export function InAppProductListPage({}: InAppProductListPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="Products" />
                <StageSwitchTabsContainer url={IN_APP_PRODUCT_LIST_URL}>
                    <ListLayoutFragment>
                        <InAppProductListFilterContainer />
                        <InAppProductListContainer />
                        <ListPagerContainer
                            url={IN_APP_PRODUCT_LIST_URL}
                            selectorFactory={inAppProductListPageSelector}
                            defaultPageSize={IN_APP_PRODUCTS_BASE_PAGE_SIZE}
                        />
                    </ListLayoutFragment>
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}
