import { all, call, put, spawn, takeEvery } from "redux-saga/effects";

import { checkUserAccess } from "shared/checkUserAccess";
import { emotionAssetListLoadingAction, emotionAssetListLoadedOkAction, emotionAssetListLoadAction } from "../actions";
import {
    AssetListParams,
    EmotionAsset,
    EmotionAssetName,
    assetsWithEmotions,
    getAssetList
} from "features/search-assets/services";
import { addPopUpMessageAction } from "shared/store";

export function* watchEmotionAssetListSaga() {
    yield takeEvery(
        emotionAssetListLoadAction.TYPE,
        function* (action: typeof emotionAssetListLoadAction.typeOf.action) {
            const hasAccess: boolean = yield call(checkUserAccess, "AssetFull");
            if (hasAccess) {
                yield spawn(loadEmotionAssetList, action.stage, action.emotionId, action.params, action.loadOnly);
            }
        }
    );
}

export function* loadEmotionAssetList(
    stage: string,
    emotionId: string,
    params: AssetListParams,
    loadOnly?: EmotionAssetName[] | null
) {
    yield put(emotionAssetListLoadingAction({ stage, emotionId, params }));

    const listsToLoad = loadOnly ?? assetsWithEmotions;

    const result: { assetType: EmotionAssetName; data: EmotionAsset[] }[] = yield all(
        listsToLoad.map(function* (asset) {
            try {
                const data: EmotionAsset[] = yield call(getAssetList, stage, asset, {
                    emotions: [emotionId],
                    ...params
                });

                return { assetType: asset, data };
            } catch (e) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to load ${asset} asset list`,
                        messageStyle: "warning"
                    })
                );
                return { assetType: asset, data: [] };
            }
        })
    );

    yield put(emotionAssetListLoadedOkAction({ stage, emotionId, params, result }));
}
