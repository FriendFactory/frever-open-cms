import React from "react";
import { Route } from "react-router";

import {
    CATEGORY_LIST_URL,
    EDITOR_SETTINGS_DETAILS_URL,
    EDITOR_SETTINGS_LIST_URL,
    GEO_CLUSTERS_LIST_URL,
    GEO_CLUSTER_DETAILS_URL,
    PROMOTED_SONG_LIST_URL,
    STORAGE_FILE_LIST_URL,
    UMA_SHARED_COLOR_DETAILS_URL,
    LOCALIZATION_LIST_URL,
    DEVICE_BLACKLIST_LIST_URL,
    UNIVERSE_LIST_URL,
    UNIVERSE_DETAILS_URL,
    WATERMARK_LIST_URL,
    WATERMARK_DETAILS_URL,
    INTELLECTUAL_PROPERTY_LIST_URL,
    INTELLECTUAL_PROPERTY_DETAILS_URL,
    RACE_LIST_URL,
    RACE_DETAILS_URL
} from "urls";

import StorageFileListPage from "pages/StorageFileListPage";
import CategoryListPage from "pages/categories-pages/CategoryListPage";
import EditorSettingsDetailsPage from "pages/categories-pages/EditorSettingsDetailsPage";
import EditorSettingsListPage from "pages/categories-pages/EditorSettingsListPage";
import UmaSharedColorPage from "pages/categories-pages/UmaSharedColorPage";
import GeoClustersListPage from "pages/categories-pages/GeoClustersListPage";
import GeoClusterDetailsPage from "pages/categories-pages/GeoClusterDetailsPage";
import { PromotedSongListPage } from "pages/PromotedSongListPage";

import { renderProtectedPageElement } from "shared";
import {
    DeviceBlacklistPage,
    IntellectualPropertyDetailsPage,
    IntellectualPropertyListPage,
    LocalizationListPage,
    RaceDetailsPage,
    RaceListPage,
    UniverseDetailsPage,
    UniverseListPage
} from "pages";
import { WatermarkDetailsPage, WatermarkListPage } from "pages/watermark-pages";

export const CategoriesRoutes = [
    <Route
        key="geo-cluster-details-page"
        path={GEO_CLUSTER_DETAILS_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", GeoClusterDetailsPage)}
    />,
    <Route
        key="geo-clusters-list-page"
        path={GEO_CLUSTERS_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", GeoClustersListPage)}
    />,
    <Route
        key="promoted-song-list-page"
        path={PROMOTED_SONG_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", PromotedSongListPage)}
    />,
    <Route
        key="localization-list-page"
        path={LOCALIZATION_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", LocalizationListPage)}
    />,
    <Route
        key="device-blacklist-page"
        path={DEVICE_BLACKLIST_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", DeviceBlacklistPage)}
    />,
    <Route
        key="universe-list-page"
        path={UNIVERSE_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", UniverseListPage)}
    />,
    <Route
        key="universe-details-page"
        path={UNIVERSE_DETAILS_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", UniverseDetailsPage)}
    />,
    <Route
        key="ip-list-page"
        path={INTELLECTUAL_PROPERTY_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", IntellectualPropertyListPage)}
    />,
    <Route
        key="ip-details-page"
        path={INTELLECTUAL_PROPERTY_DETAILS_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", IntellectualPropertyDetailsPage)}
    />,
    <Route
        key="race-list-page"
        path={RACE_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", RaceListPage)}
    />,
    <Route
        key="race-details-page"
        path={RACE_DETAILS_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", RaceDetailsPage)}
    />,
    <Route
        key="watermark-list-page"
        path={WATERMARK_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", WatermarkListPage)}
    />,
    <Route
        key="watermark-details-page"
        path={WATERMARK_DETAILS_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", WatermarkDetailsPage)}
    />,
    <Route
        key="storage-file-list-page"
        path={STORAGE_FILE_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", StorageFileListPage)}
    />,
    <Route
        key="editor-settings-details-page"
        path={EDITOR_SETTINGS_DETAILS_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", EditorSettingsDetailsPage)}
    />,
    <Route
        key="uma-shared-color-page"
        path={UMA_SHARED_COLOR_DETAILS_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", UmaSharedColorPage)}
    />,
    <Route
        key="editor-settings-list-page"
        path={EDITOR_SETTINGS_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", EditorSettingsListPage)}
    />,
    <Route
        key="category-list-page"
        path={CATEGORY_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", CategoryListPage)}
    />
];
