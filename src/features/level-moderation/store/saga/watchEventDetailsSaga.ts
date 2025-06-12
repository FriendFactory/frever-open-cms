import { call, put, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";

import { getEventDetails, LevelEvent } from "../../services";
import { EVENT_DETAILS_PAGE_URL } from "urls";
import { eventDetailsLoadingAction, eventDetailsLoadedOkAction, eventDetailsLoadedErrorAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchEventDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = EVENT_DETAILS_PAGE_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        const { stage, id } = urlMatch.params;

        try {
            yield put(eventDetailsLoadingAction({ stage, id }));

            const result: LevelEvent = yield call(getEventDetails, stage, id);

            yield put(
                eventDetailsLoadedOkAction({
                    stage,
                    id,
                    result
                })
            );
        } catch (responseError) {
            yield put(
                eventDetailsLoadedErrorAction({
                    stage,
                    id,
                    error: (responseError as Error).toString()
                })
            );

            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to load the Event details. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
