import React from "react";
import { RouteComponentProps } from "react-router";

import { PageURLNotMatch, StageSwitchTabsContainer } from "shared";
import { ListLayoutFragment, ContentWithHeaderFragment, SideMenuLayout } from "layout";
import { SEARCH_ASSET_URL, DEFAULT_ASSETS_PAGE_SIZE } from "urls";
import {
    AssetDeletionModalContainer,
    AssetListPagerContainer,
    assetListPageSelector,
    AssetMigrationContainer,
    FilterFormContainer,
    SearchPageTitleContainer,
    AssetsContainer
} from "features/search-assets";

export function SearchAssetPage(props: RouteComponentProps) {
    const urlMatch = SEARCH_ASSET_URL.match(props.location);
    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <SearchPageTitleContainer
                        url={SEARCH_ASSET_URL}
                        stage={urlMatch.params.stage}
                        asset={urlMatch.params.asset}
                        params={urlMatch.query || {}}
                    />
                    <>
                        <StageSwitchTabsContainer url={SEARCH_ASSET_URL} cacheResetBtn>
                            <ListLayoutFragment>
                                <FilterFormContainer
                                    url={SEARCH_ASSET_URL}
                                    stage={urlMatch.params.stage}
                                    asset={urlMatch.params.asset}
                                    params={urlMatch.query || {}}
                                />
                                <AssetsContainer
                                    stage={urlMatch.params.stage}
                                    assetType={urlMatch.params.asset}
                                    params={urlMatch.query || {}}
                                />
                                <AssetListPagerContainer
                                    defaultPageSize={DEFAULT_ASSETS_PAGE_SIZE}
                                    url={SEARCH_ASSET_URL}
                                    selectorFactory={assetListPageSelector}
                                />
                            </ListLayoutFragment>
                        </StageSwitchTabsContainer>
                        <AssetDeletionModalContainer url={SEARCH_ASSET_URL} />
                        <AssetMigrationContainer stage={urlMatch.params.stage} />
                    </>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}
