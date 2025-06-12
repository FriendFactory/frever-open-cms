import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { ResultWithCount } from "shared";
import { checkUserAccess } from "shared/checkUserAccess";
import { EMOTIONS_LIST_URL } from "urls";
import {
    emotionsListLoadingAction,
    emotionsListLoadedOkAction,
    emotionsListLoadedErrorAction,
    emotionsListLoadAction
} from "../actions";

import { Emotion, EmotionsQueryParams, getEmotions } from "features/emotion-moderation/services";

export function* watchEmotionsListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = EMOTIONS_LIST_URL.match(action.payload.location, true);

        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "CategoriesFull");
        if (!hasAccess) return;

        yield spawn(loadEmotions, urlMatch.params.stage, urlMatch.query || {});
    });

    yield takeEvery(emotionsListLoadAction.TYPE, function* (action: typeof emotionsListLoadAction.typeOf.action) {
        const hasAccess: boolean = yield call(checkUserAccess, "CategoriesFull");
        if (!hasAccess) return;

        yield spawn(loadEmotions, action.stage, action.params);
    });
}

export function* loadEmotions(stage: string, params: EmotionsQueryParams) {
    try {
        yield put(emotionsListLoadingAction({ stage, params }));

        const { data, count }: ResultWithCount<Emotion> = yield call(getEmotions, stage, params);

        yield put(emotionsListLoadedOkAction({ stage, params, data, total: count }));
    } catch (e) {
        yield put(
            emotionsListLoadedErrorAction({
                stage,
                params,
                error: `Failed to load emotions list. ${(e as Error).message}`
            })
        );
    }
}
