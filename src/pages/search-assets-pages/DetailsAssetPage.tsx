import React from "react";
import { RouteComponentProps } from "react-router";

import { DETAILS_ASSET_URL } from "urls";
import { PageURLNotMatch } from "shared";
import { ThemeCollectionsWardrobeListContainer } from "features/theme-collections";

import { SideMenuLayout, DetailsPageLayout, ColumnsLayout, ContentWithHeaderFragment } from "layout";
import {
    AssetHeaderContainer,
    SubAssetsContainer,
    AssetDynamicFormComponent,
    AssetTagsContainer,
    AssetStoreInfoContainer,
    AssetThumbnailListContainer,
    WardrobeGenderGroup,
    SongTrackContainer,
    AssetMigrationContainer,
    AssetDeletionModalContainer,
    SetLocationOfSpawnPosition,
    SpawnPositionListBlock,
    BodyAnimationAndVfxContainer
} from "features/search-assets";

export function DetailsAssetPage(props: RouteComponentProps) {
    const urlMatch = DETAILS_ASSET_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <>
                        <AssetHeaderContainer url={DETAILS_ASSET_URL} />
                        {urlMatch.params.asset === "Wardrobe" && <WardrobeGenderGroup />}
                        {urlMatch.params.asset === "CharacterSpawnPosition" && <SetLocationOfSpawnPosition />}
                    </>
                    <DetailsPageLayout>
                        <ColumnsLayout>
                            {urlMatch.params.asset === "Song" && <SongTrackContainer />}
                            <AssetDynamicFormComponent {...urlMatch.params} />
                            {urlMatch.params.asset === "BodyAnimation" && (
                                <BodyAnimationAndVfxContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                            )}
                            {urlMatch.params.asset === "Wardrobe" && (
                                <ThemeCollectionsWardrobeListContainer
                                    stage={urlMatch.params.stage}
                                    wardrobeId={urlMatch.params.id}
                                />
                            )}
                            <AssetStoreInfoContainer />
                            <AssetMigrationContainer stage={urlMatch.params.stage} />
                            <AssetDeletionModalContainer url={DETAILS_ASSET_URL} />
                        </ColumnsLayout>

                        <ColumnsLayout>
                            <AssetTagsContainer url={DETAILS_ASSET_URL} />
                            <AssetThumbnailListContainer />
                        </ColumnsLayout>

                        <div>
                            <SubAssetsContainer />
                            {urlMatch.params.asset === "BodyAnimation" && (
                                <SpawnPositionListBlock
                                    stage={urlMatch.params.stage}
                                    bodyAnimationId={String(urlMatch.params.id)}
                                />
                            )}
                        </div>
                    </DetailsPageLayout>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}
