import { call, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import {
    trackDetailsLoadingAction,
    trackDetailsLoadedOkAction,
    trackDetailsLoadedErrorAction,
    trackDetailsHandleLoadAction
} from "../actions";
import { getTrackDetails, TrackDetailsResult } from "features/external-music/services/getTrackDetails";

export function* watchTrackDetailsSaga() {
    yield takeEvery(
        trackDetailsHandleLoadAction.TYPE,
        function* (action: typeof trackDetailsHandleLoadAction.typeOf.action) {
            const { stage, params } = action;
            try {
                yield put(trackDetailsLoadingAction({ stage, params }));

                const result: TrackDetailsResult = yield call(getTrackDetails, stage, params);

                yield put(
                    trackDetailsLoadedOkAction({
                        stage,
                        params,
                        result
                    })
                );
            } catch (e) {
                yield put(
                    trackDetailsLoadedErrorAction({
                        stage,
                        params,
                        error: (e as Error).toString()
                    })
                );
                yield put(
                    addPopUpMessageAction({
                        messageText: `Track not found - ID: ${action.params.trackId}, ISO: ${action.params.country}. Try searching with another country ISO code.`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
