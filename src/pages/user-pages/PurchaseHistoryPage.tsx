import React from "react";

import { DEFAULT_PURCHASE_HISTORY_LIST_PAGE_SIZE, USER_PURCHASE_HISTORY_TAB_URL } from "urls";
import { ListLayoutFragment } from "layout";
import { ListPagerContainer } from "shared";
import { purchaseHistoryPagerSelector } from "features/purchase-history";
import { UserPageLayout } from "features/user-moderation/containers/UserDetails/UserMainTab/UserPageLayout";
import { PurchaseHistoryListContainer } from "features/purchase-history/containers/PurchaseHistoryListContainer";

export interface PurchaseHistoryPageProps {
    match: { params: { stage: string; id: number } };
}

export function PurchaseHistoryPage({ match: { params } }: PurchaseHistoryPageProps) {
    return (
        <UserPageLayout tab="MoneyPurchases">
            <ListLayoutFragment padding="paddingLG">
                <div></div>
                <PurchaseHistoryListContainer />
                <ListPagerContainer
                    defaultPageSize={DEFAULT_PURCHASE_HISTORY_LIST_PAGE_SIZE}
                    url={USER_PURCHASE_HISTORY_TAB_URL}
                    selectorFactory={(stage, query) => purchaseHistoryPagerSelector(stage, params.id, query)}
                />
            </ListLayoutFragment>
        </UserPageLayout>
    );
}
