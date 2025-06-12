import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { INTELLECTUAL_PROPERTY_LIST_URL } from "urls";
import { addPopUpMessageAction } from "shared/store";
import { ResultWithCount } from "shared";
import {
    intellectualPropertyListLoadAction,
    intellectualPropertyListLoadingAction,
    intellectualPropertyListLoadedOkAction,
    intellectualPropertyListLoadedErrorAction
} from "../actions/intellectualPropertyListActions";
import { IntellectualProperty, IntellectualPropertyQueryParams } from "features/intellectual-property";
import { getIntellectualPropertyList } from "features/intellectual-property/services";

export function* watchIntellectualPropertyListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = INTELLECTUAL_PROPERTY_LIST_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        yield spawn(loadIntellectualPropertyList, urlMatch.params.stage, urlMatch.query || {});
    });

    yield takeEvery(
        intellectualPropertyListLoadAction.TYPE,
        function* (action: typeof intellectualPropertyListLoadAction.typeOf.action) {
            yield spawn(loadIntellectualPropertyList, action.stage, action.params);
        }
    );
}

export function* loadIntellectualPropertyList(stage: string, params: IntellectualPropertyQueryParams) {
    try {
        yield put(intellectualPropertyListLoadingAction({ stage, params }));

        const { data, count }: ResultWithCount<IntellectualProperty> = yield call(
            getIntellectualPropertyList,
            stage,
            params
        );

        yield put(intellectualPropertyListLoadedOkAction({ stage, params, data, total: count }));
    } catch (error) {
        yield put(
            intellectualPropertyListLoadedErrorAction({
                stage,
                params,
                error: (error as Error).toString()
            })
        );
        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load intellectual property. ${(error as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
