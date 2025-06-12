import { call, put, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";

import { getLevelList, Level } from "../../services";
import { USER_LEVEL_LIST_TAB_URL } from "urls";
import { levelListLoadingAction, levelListLoadedOkAction, levelListLoadedErrorAction } from "../actions";

import { addPopUpMessageAction } from "shared/store";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchLevelListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = USER_LEVEL_LIST_TAB_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        const stage = urlMatch.params.stage;
        const params = urlMatch.query || {};

        try {
            yield put(levelListLoadingAction({ stage, params }));

            const result: Level[] = yield call(getLevelList, stage, params);

            yield put(
                levelListLoadedOkAction({
                    stage,
                    params,
                    result
                })
            );
        } catch (responseError) {
            yield put(
                levelListLoadedErrorAction({
                    stage,
                    params,
                    error: (responseError as Error).toString()
                })
            );

            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to load the level details. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
