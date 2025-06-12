import { call, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { getTracks, TracksSearchResult } from "features/external-music/services/getTracks";
import {
    tracksSearchLoadingAction,
    tracksSearchLoadedOkAction,
    tracksSearchLoadedErrorAction,
    tracksSearchHandleLoadAction
} from "../actions";

export function* watchTracksSearchSaga() {
    yield takeEvery(
        tracksSearchHandleLoadAction.TYPE,
        function* (action: typeof tracksSearchHandleLoadAction.typeOf.action) {
            const { stage, params } = action;
            try {
                yield put(tracksSearchLoadingAction({ stage, params }));

                const result: TracksSearchResult = yield call(getTracks, stage, params);

                yield put(
                    tracksSearchLoadedOkAction({
                        stage,
                        params,
                        result
                    })
                );
            } catch (e) {
                yield put(
                    tracksSearchLoadedErrorAction({
                        stage,
                        params,
                        error: (e as Error).toString()
                    })
                );
                yield put(
                    addPopUpMessageAction({
                        messageText: (e as Error).toString(),
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
