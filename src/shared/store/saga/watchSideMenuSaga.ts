import { call, put, select, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";

import * as appURLs from "urls";
import { AppState } from "app-state";
import { getCurrentStageTab } from "shared/services";
import { getUserGroupId } from "shared/checkUserAccess";
import { AdminAccessScope, getAdminUserAccessScope } from "features/permission-moderation/services";
import { updateSideMenuCurrentEnvAction, updateSideMenuParamsAction } from "../actions/sideMenu";
import { AssetTypes, CategoryTypes } from "config";

export function* watchSideMenuAcessScopeSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        try {
            const appState: AppState = yield select();
            const stage = appState.sideMenuParams.stage;
            const userGroupId = getUserGroupId(stage);
            const accessScope: AdminAccessScope[] = yield call(getAdminUserAccessScope, stage, userGroupId);

            const selectedKeys = createSelectedKeys(stage, action.payload.location);

            yield put(updateSideMenuParamsAction({ accessScope, selectedKeys, stage }));
        } catch (e) {
            return;
        }
    });
    yield takeEvery(
        updateSideMenuCurrentEnvAction.TYPE,
        function* (action: typeof updateSideMenuCurrentEnvAction.typeOf.action) {
            try {
                const { stage } = action;
                const userGroupId = getUserGroupId(stage);
                const accessScope: AdminAccessScope[] = yield call(getAdminUserAccessScope, stage, userGroupId);
                const appState: AppState = yield select();

                const selectedKeys = createSelectedKeys(stage, appState.router.location);

                yield put(updateSideMenuParamsAction({ accessScope, selectedKeys, stage }));
            } catch (e) {
                return;
            }
        }
    );
}

const createSelectedKeys = (stage: string, currentLocation: LocationChangeAction["payload"]["location"]) => {
    const searchUrlMatch = appURLs.ASSET_BASE_URL.match(currentLocation, false);
    if (searchUrlMatch.isMatched) {
        return [makeSearchAssetKey(searchUrlMatch.params.asset)];
    }

    const categoryMatch = appURLs.CATEGORY_LIST_URL.match(currentLocation, false);
    if (categoryMatch.isMatched) {
        return [makeSearchCategoryKey(categoryMatch.params.category)];
    }

    if (appURLs.BODY_ANIMATION_LINKER_URL.match(currentLocation, false).isMatched) {
        return [appURLs.SEARCH_ASSET_URL.format({ stage, asset: "BodyAnimation" })];
    }

    for (const [key, value] of selectedKeys) {
        if (key.match(currentLocation, false).isMatched) {
            return [value.format({ stage })];
        }
    }

    return [];
};

export const makeSearchAssetKey = (asset: AssetTypes) =>
    appURLs.SEARCH_ASSET_URL.format({ asset, stage: getCurrentStageTab() });

export const makeSearchCategoryKey = (category: CategoryTypes) =>
    appURLs.CATEGORY_LIST_URL.format({ category, stage: getCurrentStageTab() });

const selectedKeys = [
    [appURLs.TAG_BASE_URL, appURLs.TAG_LIST_PAGE_URL],
    [appURLs.TEMPLATE_BASE_URL, appURLs.TEMPLATE_LIST_URL],
    [appURLs.CHARACTER_BASE_URL, appURLs.CHARACTER_LIST_URL],
    [appURLs.UMA_BUNDLE_BASE_URL, appURLs.UMA_BUNDLE_SEARCH_URL],
    [appURLs.SEASON_BASE_URL, appURLs.SEASON_LIST_PAGE_URL],
    [appURLs.TASK_BASE_URL, appURLs.TASK_LIST_URL],
    [appURLs.PLAYLISTS_BASE_URL, appURLs.PLAYLISTS_PAGE_URL],
    [appURLs.HASHTAG_BASE_URL, appURLs.HASHTAG_LIST_PAGE_URL],
    [appURLs.VIDEO_MODERATION_BASE_URL, appURLs.VIDEO_MODERATION_LIST_URL],
    [appURLs.COLD_START_URL, appURLs.COLD_START_URL],
    [appURLs.REPORTED_VIDEO_BASE_URL, appURLs.REPORTED_VIDEO_LIST_URL],
    [appURLs.USER_MODERATION_BASE_URL, appURLs.USER_MODERATION_LIST_URL],
    [appURLs.USER_LEADERBOARD_BASE_URL, appURLs.USER_LEADERBOARD_LIST_URL],
    [appURLs.VIDEO_LEADERBOARD_BASE_URL, appURLs.VIDEO_LEADERBOARD_LIST_URL],
    [appURLs.EXTERNAL_SONG_BASE_URL, appURLs.EXTERNAL_SONG_LIST_URL],
    [appURLs.EDITOR_SETTINGS_BASE_URL, appURLs.EDITOR_SETTINGS_LIST_URL],
    [appURLs.EXCHANGE_OFFERS_URL, appURLs.EXCHANGE_OFFERS_URL],
    [appURLs.IN_APP_PRODUCT_BASE_URL, appURLs.IN_APP_PRODUCT_LIST_URL],
    [appURLs.IN_APP_PRICE_TIERS_URL, appURLs.IN_APP_PRICE_TIERS_URL],
    [appURLs.CREATOR_CANDIDATE_BASE_URL, appURLs.CREATOR_CANDIDATE_LIST_URL],
    [appURLs.STORAGE_FILE_BASE_URL, appURLs.STORAGE_FILE_LIST_URL],
    [appURLs.CMS_ADMIN_ROLES_PAGE_URL, appURLs.CMS_ADMIN_ROLES_PAGE_URL],
    [appURLs.CMS_ADMIN_USERS_PAGE_URL, appURLs.CMS_ADMIN_USERS_PAGE_URL],
    [appURLs.BOT_BASE_PAGE_URL, appURLs.BOT_LIST_PAGE_URL],
    [appURLs.BOT_COMMENT_BASE_PAGE_URL, appURLs.BOT_COMMENT_LIST_PAGE_URL],
    [appURLs.CREATOR_CODES_BASE_PAGE, appURLs.CREATOR_CODES_LIST_PAGE],
    [appURLs.CREATOR_MESSAGES_BASE_PAGE, appURLs.CREATOR_WELCOME_MESSAGES_PAGE],
    [appURLs.GEO_CLUSTERS_BASE_URL, appURLs.GEO_CLUSTERS_LIST_URL],
    [appURLs.REPORTED_CHAT_MESSAGE_BASE_URL, appURLs.REPORTED_CHAT_MESSAGE_LIST_URL],
    [appURLs.CREWS_BASE_URL, appURLs.CREWS_LIST_PAGE_URL],
    [appURLs.CREW_REWARDS_BASE_URL, appURLs.CREW_REWARDS_LIST_URL],
    [appURLs.PROMOTED_SONG_BASE_URL, appURLs.PROMOTED_SONG_LIST_URL],
    [appURLs.ONBOARDING_QUEST_GROUP_BASE_PAGE_URL, appURLs.ONBOARDING_QUEST_GROUP_LIST_PAGE_URL],
    [appURLs.THEME_COLLECTIONS_BASE_URL, appURLs.THEME_COLLECTIONS_LIST_URL],
    [appURLs.EMOTIONS_BASE_URL, appURLs.EMOTIONS_LIST_URL],
    [appURLs.CHATS_BASE_URL, appURLs.CHATS_LIST_PAGE_URL],
    [appURLs.LOCALIZATION_BASE_URL, appURLs.LOCALIZATION_LIST_URL],
    [appURLs.VME_BACKGROUND_BASE_URL, appURLs.VME_BACKGROUND_LIST_URL],
    [appURLs.BACKGROUND_AI_BASE_URL, appURLs.BACKGROUND_AI_LIST_URL],
    [appURLs.DEVICE_BLACKLIST_BASE_URL, appURLs.DEVICE_BLACKLIST_LIST_URL],
    [appURLs.COMMUNITY_CHAT_URL, appURLs.COMMUNITY_CHAT_URL],
    [appURLs.MASS_SEND_OUTS_BASE_URL, appURLs.MASS_SEND_OUTS_LIST_PAGE_URL],
    [appURLs.SPAWN_FORMATION_BASE_PAGE_URL, appURLs.SPAWN_FORMATION_LIST_PAGE_URL],
    [appURLs.UNIVERSE_BASE_URL, appURLs.UNIVERSE_LIST_URL],
    [appURLs.INTELLECTUAL_PROPERTY_BASE_URL, appURLs.INTELLECTUAL_PROPERTY_LIST_URL],
    [appURLs.RACE_BASE_URL, appURLs.RACE_LIST_URL],
    [appURLs.WATERMARK_BASE_URL, appURLs.WATERMARK_LIST_URL],
    [appURLs.CREATE_PAGE_BASE_URL, appURLs.CREATE_PAGE_LIST_URL]
];
