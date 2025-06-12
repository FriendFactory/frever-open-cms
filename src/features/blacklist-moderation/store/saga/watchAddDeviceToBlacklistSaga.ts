import { call, fork, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { addDeviceToBlacklistAction } from "../actions/deviceBlacklist";
import { loadDeviceBlacklist } from "./watchDeviceBlacklistListSaga";
import { postDeviceBlacklist } from "features/blacklist-moderation/services";
import { DEVICE_BLACKLIST_LIST_URL } from "urls";

export function* watchAddDeviceToBlacklistSaga() {
    yield takeEvery(
        addDeviceToBlacklistAction.TYPE,
        function* (action: typeof addDeviceToBlacklistAction.typeOf.action) {
            const { stage, data } = action;
            try {
                yield call(postDeviceBlacklist, stage, data);

                const listUrlMatch = DEVICE_BLACKLIST_LIST_URL.match(location, true);
                if (listUrlMatch.isMatched) {
                    yield fork(loadDeviceBlacklist, stage, listUrlMatch.query || {});
                }
            } catch (error) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to add device ID: ${data.deviceId} to blacklist. ${(
                            error as Error
                        ).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
