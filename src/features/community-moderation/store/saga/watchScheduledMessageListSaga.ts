import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { MASS_SEND_OUTS_LIST_PAGE_URL } from "urls";
import {
    scheduledMessageListLoadingAction,
    scheduledMessageListLoadedOkAction,
    scheduledMessageListLoadedErrorAction
} from "../actions/scheduledMessageList";
import {
    getScheduledMessage,
    ScheduledMessageQueryParams
} from "features/community-moderation/services/scheduledMessage/getScheduledMessage";
import { ScheduledMessage } from "features/community-moderation/services/api";
import { ResultWithCount } from "shared";

export function* watchScheduledMessageListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = MASS_SEND_OUTS_LIST_PAGE_URL.match(action.payload.location, true);

        if (!urlMatch.isMatched) return;

        yield spawn(loadScheduledMessage, urlMatch.params.stage, urlMatch.query || {});
    });
}

export function* loadScheduledMessage(stage: string, params: ScheduledMessageQueryParams) {
    try {
        yield put(scheduledMessageListLoadingAction({ stage, params }));

        const { data, count }: ResultWithCount<ScheduledMessage> = yield call(getScheduledMessage, stage, params);

        yield put(scheduledMessageListLoadedOkAction({ stage, params, data, total: count }));
    } catch (e) {
        yield put(
            scheduledMessageListLoadedErrorAction({
                stage,
                params,
                error: `Failed to load scheduled message list. ${(e as Error).message}`
            })
        );
    }
}
