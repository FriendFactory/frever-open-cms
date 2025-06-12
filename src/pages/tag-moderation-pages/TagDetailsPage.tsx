import React from "react";
import { RouteComponentProps } from "react-router";
import { Card } from "antd";

import {
    SideMenuLayout,
    ContentWithHeaderFragment,
    ListLayoutFragment,
    ContentBlankLayout,
    ColumnsLayout
} from "layout";
import { TagDetailsPageHeaderContainer, TagFormContainer } from "features/tag-moderation";
import { TagAssetListContainer, tagAssetListPageSelector } from "features/search-assets";
import { DEFAULT_TAG_ASSET_LIST_SIZE, TAG_DETAILS_PAGE_URL } from "urls";
import { ListPagerContainer, PageURLNotMatch } from "shared";
import { TagAssetListFilterFormContainer } from "features/search-assets/containers/TagAssetList/TagAssetListFilterFormContainer";

export function TagDetailsPage(props: RouteComponentProps) {
    const urlMatch = TAG_DETAILS_PAGE_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <TagDetailsPageHeaderContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                    <ContentBlankLayout>
                        <ColumnsLayout>
                            <TagFormContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                            <Card>
                                <ListLayoutFragment>
                                    <TagAssetListFilterFormContainer url={TAG_DETAILS_PAGE_URL} />
                                    <TagAssetListContainer url={TAG_DETAILS_PAGE_URL} />
                                    <ListPagerContainer
                                        url={TAG_DETAILS_PAGE_URL}
                                        defaultPageSize={DEFAULT_TAG_ASSET_LIST_SIZE}
                                        selectorFactory={tagAssetListPageSelector}
                                    />
                                </ListLayoutFragment>
                            </Card>
                        </ColumnsLayout>
                    </ContentBlankLayout>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}
