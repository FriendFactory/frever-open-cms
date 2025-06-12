import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { deleteAsset } from "../../services";
import { assetDeleteAction } from "../actions";
import { DETAILS_ASSET_URL, SEARCH_ASSET_URL } from "urls";
import { addPopUpMessageAction } from "shared/store";
import { loadAssetListSaga } from "./watch.AssetList.saga";

export function* watchAssetsDeleteSaga() {
    yield takeEvery(assetDeleteAction.TYPE, function* (action: typeof assetDeleteAction.typeOf.action) {
        try {
            const deleteMap = action.assetsToDelete.map(function* (id: number) {
                try {
                    yield call(deleteAsset, action.stage, action.asset, id);
                    return id;
                } catch (responseError) {
                    yield put(
                        addPopUpMessageAction({
                            messageText: `Failed to delete ${action.asset}(ID:${id}). ${(
                                responseError as Error
                            ).toString()}`,
                            messageStyle: "error"
                        })
                    );
                    return;
                }
            });
            const result: number[] = yield all(deleteMap);

            if (result.filter(Boolean).length) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `${action.asset} delete success.`,
                        messageStyle: "success"
                    })
                );
            }
            const detailsPageUrlMatch = DETAILS_ASSET_URL.match(location, true);
            const listPageUrlMatch = SEARCH_ASSET_URL.match(location, true);

            if (detailsPageUrlMatch.isMatched) {
                history.back();
            } else if (listPageUrlMatch.isMatched) {
                const { stage, asset } = listPageUrlMatch.params;
                const params = listPageUrlMatch.query || {};

                yield fork(loadAssetListSaga, { stage, asset, params });
            } else {
                return;
            }
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to delete the ${action.asset}. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
