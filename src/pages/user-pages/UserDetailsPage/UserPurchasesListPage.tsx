import React from "react";

import { ListLayoutFragment } from "layout";
import { PurchasedAssetListContainer } from "features/user-moderation/containers/PurchasedAssets/PurchasedAssetListContainer";
import { UserPageLayout } from "features/user-moderation/containers/UserDetails/UserMainTab/UserPageLayout";
import { PurchasedAssetListFilterContainer } from "features/user-moderation/containers/PurchasedAssets/PurchasedAssetListFilterContainer";
import { DEFAULT_PURCHASES_LIST_PAGE_SIZE, USER_ASSET_PURCHASES_TAB_URL } from "urls";
import { ListPagerContainer } from "shared";
import { purchasedAssetsPageSelector } from "features/user-moderation/store/reducer/purchasedAssets.reducer";

export interface UserPurchasesListPageProps {}

export function UserPurchasesListPage({}: UserPurchasesListPageProps) {
    return (
        <UserPageLayout tab="Purchases">
            <ListLayoutFragment padding="paddingLG">
                <PurchasedAssetListFilterContainer url={USER_ASSET_PURCHASES_TAB_URL} />
                <PurchasedAssetListContainer />
                <ListPagerContainer
                    url={USER_ASSET_PURCHASES_TAB_URL}
                    defaultPageSize={DEFAULT_PURCHASES_LIST_PAGE_SIZE}
                    selectorFactory={purchasedAssetsPageSelector}
                />
            </ListLayoutFragment>
        </UserPageLayout>
    );
}
