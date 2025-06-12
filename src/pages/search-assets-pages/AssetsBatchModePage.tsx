import React from "react";
import { RouteComponentProps } from "react-router";

import { PageURLNotMatch, StageSwitchTabsContainer } from "shared";
import { ListLayoutFragment, ContentWithHeaderFragment, SideMenuLayout } from "layout";
import { DEFAULT_ASSETS_PAGE_SIZE, ASSETS_BATCH_MODE_URL } from "urls";
import {
    AssetDeletionModalContainer,
    AssetListPagerContainer,
    assetListPageSelector,
    AssetMigrationContainer,
    FilterFormContainer,
    SearchPageTitleContainer,
    AssetBatchModeContainer
} from "features/search-assets";

export function AssetsBatchModePage(props: RouteComponentProps) {
    const urlMatch = ASSETS_BATCH_MODE_URL.match(props.location);
    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <SearchPageTitleContainer
                        url={ASSETS_BATCH_MODE_URL}
                        stage={urlMatch.params.stage}
                        asset={urlMatch.params.asset}
                        params={urlMatch.query || {}}
                        isBatchMode
                    />
                    <>
                        <StageSwitchTabsContainer url={ASSETS_BATCH_MODE_URL} cacheResetBtn>
                            <ListLayoutFragment>
                                <FilterFormContainer
                                    stage={urlMatch.params.stage}
                                    asset={urlMatch.params.asset}
                                    params={urlMatch.query || {}}
                                    url={ASSETS_BATCH_MODE_URL}
                                />
                                <AssetBatchModeContainer
                                    stage={urlMatch.params.stage}
                                    assetType={urlMatch.params.asset}
                                    params={urlMatch.query || {}}
                                />
                                <AssetListPagerContainer
                                    defaultPageSize={DEFAULT_ASSETS_PAGE_SIZE}
                                    url={ASSETS_BATCH_MODE_URL}
                                    selectorFactory={assetListPageSelector}
                                />
                            </ListLayoutFragment>
                        </StageSwitchTabsContainer>
                        <AssetDeletionModalContainer url={ASSETS_BATCH_MODE_URL} />
                        <AssetMigrationContainer stage={urlMatch.params.stage} />
                    </>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}
