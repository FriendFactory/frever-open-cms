import React, { useCallback } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Menu } from "antd";
import { MenuProps } from "antd/lib/menu";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import {
    BankOutlined,
    CarryOutOutlined,
    FormOutlined,
    ShopOutlined,
    UsergroupAddOutlined,
    VideoCameraOutlined,
    SettingOutlined,
    RocketOutlined,
    MessageOutlined
} from "@ant-design/icons";

import { Assets, AssetTypes, CategoryTypes, Categories, FeaturesTypes } from "config";
import { getCurrentStageTab, getOpenedMenuItems, setOpenedMenuItems } from "shared";
import * as appUrls from "urls";
import { AppState } from "app-state";
import { AdminAccessScope } from "features/permission-moderation/services";
import { makeSearchAssetKey, makeSearchCategoryKey } from "shared/store/saga/watchSideMenuSaga";
import { SideMenuTabs } from "./SideMenuTabs";

type MenuItemType = ItemType & { feature?: FeaturesTypes };

const getItem = (
    key: React.Key,
    label: React.ReactNode,
    feature?: FeaturesTypes,
    icon?: React.ReactNode,
    children?: ItemType[]
) => ({ key, icon, children, label, feature } as MenuItemType);

export interface SideMenuProps {}

export function SideMenu({}: SideMenuProps) {
    const history = useHistory();
    const openedMenuItems = getOpenedMenuItems();
    const tabStageStorage = getCurrentStageTab();

    const params = useSelector((appState: AppState) => appState.sideMenuParams, shallowEqual);

    const handleOnClick = useCallback<Exclude<MenuProps["onClick"], undefined>>((item) => {
        history.push(item.key.toString());
    }, []);

    const items = useCallback(() => {
        if (params.stage) return createMenuItems(params.stage);

        return [];
    }, [params.stage]);

    return (
        <SideMenuTabs defaultActiveStage={tabStageStorage}>
            <Menu
                selectedKeys={params.selectedKeys}
                defaultOpenKeys={openedMenuItems}
                onOpenChange={setOpenedMenuItems}
                mode="inline"
                items={filterMenuItems(items(), params.accessScope)}
                onClick={handleOnClick}
            />
        </SideMenuTabs>
    );
}

const filterMenuItems = (items: MenuItemType[], accessScope?: AdminAccessScope[]): MenuItemType[] =>
    items.filter((el) => (el.feature ? accessScope?.some((scope) => scope.name === el.feature) : true));

const createMenuItems = (stage: string) => {
    return [
        getItem("asset-library", "Assets Library", "AssetFull", <ShopOutlined />, [
            ...Object.entries(Assets)
                .orderBy(([_, info]) => info.ordinal)
                .map(([id, info]) => getItem(makeSearchAssetKey(id as AssetTypes), info.title)),
            getItem(appUrls.EXTERNAL_SONG_LIST_URL.format({ stage }), "External Song"),
            getItem(appUrls.PLAYLISTS_PAGE_URL.format({ stage }), "Playlists"),
            getItem(appUrls.VME_BACKGROUND_LIST_URL.format({ stage }), "VME Background"),
            getItem(appUrls.BACKGROUND_AI_LIST_URL.format({ stage }), "AI Background"),
            getItem(appUrls.UMA_BUNDLE_SEARCH_URL.format({ stage }), "Uma Bundle"),
            getItem(appUrls.TAG_LIST_PAGE_URL.format({ stage }), "Tags")
        ]),

        getItem("video-moderation", "Video Moderation", "VideoModeration", <VideoCameraOutlined />, [
            getItem(appUrls.VIDEO_MODERATION_LIST_URL.format({ stage }), "All Videos"),
            getItem(appUrls.VIDEO_LEADERBOARD_LIST_URL.format({ stage }), "Video Leaderboard"),
            getItem(appUrls.COLD_START_URL.format({ stage }), "Cold Start"),
            getItem(appUrls.TEMPLATE_LIST_URL.format({ stage }), "Templates"),
            getItem(appUrls.TASK_LIST_URL.format({ stage }), "Tasks"),
            getItem(appUrls.REPORTED_VIDEO_LIST_URL.format({ stage }), "Reported videos"),
            getItem(appUrls.HASHTAG_LIST_PAGE_URL.format({ stage }), "Hashtags"),
            getItem(appUrls.CREATE_PAGE_LIST_URL.format({ stage }), "Create Page 2.0")
        ]),

        getItem("social", "Social", "Social", <UsergroupAddOutlined />, [
            getItem(appUrls.USER_MODERATION_LIST_URL.format({ stage }), "All Users"),
            getItem(appUrls.CREWS_LIST_PAGE_URL.format({ stage }), "Crews"),
            getItem(appUrls.CREW_REWARDS_LIST_URL.format({ stage }), "Crew Rewards"),
            getItem(appUrls.CHATS_LIST_PAGE_URL.format({ stage }), "All chats"),
            getItem(appUrls.REPORTED_CHAT_MESSAGE_LIST_URL.format({ stage }), "Chat reports"),
            getItem(appUrls.CHARACTER_LIST_URL.format({ stage }), "Characters"),
            getItem(appUrls.CREATOR_CANDIDATE_LIST_URL.format({ stage }), "Creator Candidates"),
            getItem(appUrls.CREATOR_CODES_LIST_PAGE.format({ stage }), "Creator Codes"),
            getItem(appUrls.CREATOR_WELCOME_MESSAGES_PAGE.format({ stage }), "Creator Messages"),
            getItem(appUrls.USER_LEADERBOARD_LIST_URL.format({ stage }), "Leaderboard"),
            getItem(appUrls.BOT_LIST_PAGE_URL.format({ stage }), "Automated accounts"),
            getItem(appUrls.BOT_COMMENT_LIST_PAGE_URL.format({ stage }), "Automated comments")
        ]),

        getItem("seasons", "Seasons", "Seasons", <CarryOutOutlined />, [
            getItem(appUrls.SEASON_LIST_PAGE_URL.format({ stage }), "All Seasons")
        ]),

        getItem("onboarding", "Onboarding", "Seasons", <RocketOutlined />, [
            getItem(appUrls.ONBOARDING_QUEST_GROUP_LIST_PAGE_URL.format({ stage }), "Quest Group")
        ]),

        getItem("banking", "Banking", "Banking", <BankOutlined />, [
            getItem(appUrls.IN_APP_PRODUCT_LIST_URL.format({ stage }), "In App Products"),
            getItem(appUrls.IN_APP_PRICE_TIERS_URL.format({ stage }), "In App Price Tiers"),
            getItem(appUrls.EXCHANGE_OFFERS_URL.format({ stage }), "Exchange Offers")
        ]),

        getItem("community", "Community", "ChatMessageSending", <MessageOutlined />, [
            getItem(appUrls.COMMUNITY_CHAT_URL.format({ stage }), "Chat"),
            getItem(appUrls.MASS_SEND_OUTS_LIST_PAGE_URL.format({ stage }), "Mass Send Outs")
        ]),

        getItem("categories", "Categories", "CategoriesFull", <FormOutlined />, [
            getItem(appUrls.PROMOTED_SONG_LIST_URL.format({ stage }), "Promoted Songs"),
            getItem(appUrls.LOCALIZATION_LIST_URL.format({ stage }), "Localization"),
            getItem(appUrls.THEME_COLLECTIONS_LIST_URL.format({ stage }), "Theme Collections"),
            getItem(appUrls.EMOTIONS_LIST_URL.format({ stage }), "Emotions"),
            getItem(appUrls.STORAGE_FILE_LIST_URL.format({ stage }), "Storage Files"),
            getItem(appUrls.DEVICE_BLACKLIST_LIST_URL.format({ stage }), "Device Blacklist"),
            getItem(appUrls.SPAWN_FORMATION_LIST_PAGE_URL.format({ stage }), "Character SP Formation"),
            getItem(appUrls.INTELLECTUAL_PROPERTY_LIST_URL.format({ stage }), "Intellectual Property"),
            getItem(appUrls.UNIVERSE_LIST_URL.format({ stage }), "Universe"),
            getItem(appUrls.RACE_LIST_URL.format({ stage }), "Race"),
            getItem(appUrls.WATERMARK_LIST_URL.format({ stage }), "Watermark"),
            ...Object.entries(Categories)
                .orderBy(([_, info]) => info.ordinal)
                .map(([id, info]) => getItem(makeSearchCategoryKey(id as CategoryTypes), info.title)),
            getItem(appUrls.EDITOR_SETTINGS_LIST_URL.format({ stage }), "Editor Settings"),
            getItem(appUrls.GEO_CLUSTERS_LIST_URL.format({ stage }), "Geo Clusters")
        ]),

        getItem("settings", "Settings", "Settings", <SettingOutlined />, [
            getItem(appUrls.CMS_ADMIN_ROLES_PAGE_URL.format({ stage }), "CMS Roles"),
            getItem(appUrls.CMS_ADMIN_USERS_PAGE_URL.format({ stage }), "CMS Users")
        ])
    ];
};
