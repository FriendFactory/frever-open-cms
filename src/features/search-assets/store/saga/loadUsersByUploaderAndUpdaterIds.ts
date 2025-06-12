import { all, select } from "redux-saga/effects";

import { AssetData, AssetDataNames } from "features/search-assets/services";
import {
    UserDetailsPageResult,
    userDetailsPageSelector
} from "features/user-moderation/store/reducer/user/userDetailsReducer";
import { loadUserDetails } from "features/user-moderation/store/saga/watch.UserDetails.saga";
import { AssetDetailsResultState, assetDetailsSelector } from "../reducer";

export function* loadUsersByUploaderAndUpdaterIds(stage: string, asset: keyof AssetData, assetId: number) {
    const assetsWithUserInfo = [
        "VoiceFilter",
        "BodyAnimation",
        "SFX",
        "VFX",
        "Song",
        "CameraFilter",
        "Wardrobe",
        "SetLocation"
    ];

    const selectedAsset: AssetDetailsResultState<AssetDataNames> = yield select(
        assetDetailsSelector(stage, asset, assetId)
    );

    if (!selectedAsset.data) return;

    const assetData = selectedAsset.data;
    const hasUploaderUserId = "uploaderUserId" in assetData;
    const hasUpdatedByUserId = "updatedByUserId" in assetData;

    if (assetsWithUserInfo.includes(asset) && (hasUploaderUserId || hasUpdatedByUserId)) {
        const userIdsToLoad = new Set<number>();

        const addUserIdToLoad = function* (userId: number) {
            const hasUserDataInStore: UserDetailsPageResult = yield select(
                userDetailsPageSelector({ id: userId, selector: "id", stage })
            );
            if (!hasUserDataInStore.data) userIdsToLoad.add(userId);
        };

        if (hasUploaderUserId) yield addUserIdToLoad(assetData.uploaderUserId);

        if (hasUpdatedByUserId) yield addUserIdToLoad(assetData.updatedByUserId);

        yield all([...userIdsToLoad].map((userId) => loadUserDetails({ id: userId, selector: "id", stage })));
    }
}
