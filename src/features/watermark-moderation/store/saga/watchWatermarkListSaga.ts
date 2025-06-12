import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { WATERMARK_LIST_URL } from "urls";
import { addPopUpMessageAction } from "shared/store";
import {
    watermarkListLoadingAction,
    watermarkListLoadedOkAction,
    watermarkListLoadedErrorAction,
    watermarkListLoadAction
} from "../actions/watermarkListActions";
import { Watermark, WatermarkListQueryParams } from "features/watermark-moderation";
import { getWatermarkList } from "features/watermark-moderation/services";
import { ResultWithCount } from "shared";

export function* watchWatermarkListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = WATERMARK_LIST_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        yield spawn(loadWatermarkList, urlMatch.params.stage, urlMatch.query || {});
    });

    yield takeEvery(watermarkListLoadAction.TYPE, function* (action: typeof watermarkListLoadAction.typeOf.action) {
        yield spawn(loadWatermarkList, action.stage, action.params);
    });
}

export function* loadWatermarkList(stage: string, params: WatermarkListQueryParams) {
    try {
        yield put(watermarkListLoadingAction({ stage, params }));

        const { data, count }: ResultWithCount<Watermark> = yield call(getWatermarkList, stage, params);

        yield put(watermarkListLoadedOkAction({ stage, params, data, total: count }));
    } catch (error) {
        yield put(
            watermarkListLoadedErrorAction({
                stage,
                params,
                error: (error as Error).toString()
            })
        );
        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load watermark list. ${(error as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
