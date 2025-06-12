import React from "react";
import { Route } from "react-router";

import { renderProtectedPageElement } from "shared";
import {
    SEARCH_ASSET_URL,
    DETAILS_ASSET_URL,
    UMA_BUNDLE_LINKER_URL,
    UMA_BUNDLE_SEARCH_URL,
    UMA_BUNDLE_DETAILS_URL,
    BODY_ANIMATION_LINKER_URL,
    EXTERNAL_SONG_LIST_URL,
    EXTERNAL_SONG_DETAILS_URL,
    ASSETS_BATCH_MODE_URL
} from "urls";
import {
    BodyAnimationLinkerPage,
    UmaBundleSearchPage,
    UmaBundleLinkerPage,
    DetailsAssetPage,
    ExternalSongDetailsPage,
    ExternalSongListPage,
    UmaBundleDetailsPage,
    SearchAssetPage
} from "pages";
import { AssetsBatchModePage } from "pages/search-assets-pages/AssetsBatchModePage";

export const SearchAssetRoutes = [
    <Route
        key="body-animation-linker-page"
        path={BODY_ANIMATION_LINKER_URL.urlTemplate}
        render={renderProtectedPageElement("AssetFull", BodyAnimationLinkerPage)}
    />,
    <Route
        key="external-song-details-page"
        path={EXTERNAL_SONG_DETAILS_URL.urlTemplate}
        render={renderProtectedPageElement("AssetFull", ExternalSongDetailsPage)}
    />,
    <Route
        key="external-song-list-page"
        path={EXTERNAL_SONG_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("AssetFull", ExternalSongListPage)}
    />,
    <Route
        key="uma-bundle-details-page"
        path={UMA_BUNDLE_DETAILS_URL.urlTemplate}
        render={renderProtectedPageElement("AssetFull", UmaBundleDetailsPage)}
    />,
    <Route
        key="uma-bundle-search-page"
        path={UMA_BUNDLE_SEARCH_URL.urlTemplate}
        render={renderProtectedPageElement("AssetFull", UmaBundleSearchPage)}
    />,
    <Route
        key="uma-bundle-linker-page"
        path={UMA_BUNDLE_LINKER_URL.urlTemplate}
        render={renderProtectedPageElement("AssetFull", UmaBundleLinkerPage)}
    />,
    <Route
        key="details-asset-page"
        path={DETAILS_ASSET_URL.urlTemplate}
        render={renderProtectedPageElement("AssetFull", DetailsAssetPage)}
    />,
    <Route
        key="assets-batch-mode-page"
        path={ASSETS_BATCH_MODE_URL.urlTemplate}
        render={renderProtectedPageElement("AssetFull", AssetsBatchModePage)}
    />,
    <Route
        key="search-assets-page"
        path={SEARCH_ASSET_URL.urlTemplate}
        render={renderProtectedPageElement("AssetFull", SearchAssetPage)}
    />
];
