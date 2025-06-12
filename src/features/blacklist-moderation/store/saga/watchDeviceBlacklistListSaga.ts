import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { DEVICE_BLACKLIST_LIST_URL } from "urls";
import {
    deviceBlacklistLoadingAction,
    deviceBlacklistLoadedOkAction,
    deviceBlacklistLoadedErrorAction
} from "../actions/deviceBlacklist";
import { DeviceBlacklistEntity, DeviceBlacklistQueryParams } from "features/blacklist-moderation";
import { getDeviceBlacklist } from "features/blacklist-moderation/services";
import { addPopUpMessageAction } from "shared/store";

export function* watchDeviceBlacklistListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = DEVICE_BLACKLIST_LIST_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        yield spawn(loadDeviceBlacklist, urlMatch.params.stage, urlMatch.query || {});
    });
}

export function* loadDeviceBlacklist(stage: string, params: DeviceBlacklistQueryParams) {
    try {
        yield put(deviceBlacklistLoadingAction({ stage, params }));

        const data: DeviceBlacklistEntity[] = yield call(getDeviceBlacklist, stage, params);

        yield put(deviceBlacklistLoadedOkAction({ stage, params, data }));
    } catch (error) {
        yield put(
            deviceBlacklistLoadedErrorAction({
                stage,
                params,
                error: (error as Error).toString()
            })
        );
        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load device blacklist. ${(error as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
