import { call, put, spawn, takeEvery } from "redux-saga/effects";
import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";

import { ResultWithCount } from "shared";
import { CREATE_PAGE_LIST_URL } from "urls";
import {
    createPageListLoadAction,
    createPageListLoadedErrorAction,
    createPageListLoadedOkAction,
    createPageListLoadingAction
} from "../actions";
import { CreatePageRow, CreatePageRowQueryParams, getCreatePageRow } from "features/content-moderation/services";

export function* watchCreatePageListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = CREATE_PAGE_LIST_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        yield spawn(loadCreatePageRows, urlMatch.params.stage, urlMatch.query || {});
    });

    yield takeEvery(createPageListLoadAction.TYPE, function* (action: typeof createPageListLoadAction.typeOf.action) {
        yield spawn(loadCreatePageRows, action.stage, action.params);
    });
}

export function* loadCreatePageRows(stage: string, params: CreatePageRowQueryParams) {
    try {
        yield put(createPageListLoadingAction({ stage, params }));

        const { data, count }: ResultWithCount<CreatePageRow> = yield call(getCreatePageRow, stage, params);

        yield put(createPageListLoadedOkAction({ stage, params, data, total: count }));
    } catch (e) {
        yield put(
            createPageListLoadedErrorAction({
                stage,
                params,
                error: `Failed to load Create Page list. ${(e as Error).message}`
            })
        );
    }
}
