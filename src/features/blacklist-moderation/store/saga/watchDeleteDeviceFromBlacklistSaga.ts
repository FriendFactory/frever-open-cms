import { call, fork, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { deleteDeviceFromBlacklistAction } from "../actions/deviceBlacklist";
import { loadDeviceBlacklist } from "./watchDeviceBlacklistListSaga";
import { deleteDeviceBlacklist } from "features/blacklist-moderation/services";
import { DEVICE_BLACKLIST_LIST_URL } from "urls";

export function* watchDeleteDeviceFromBlacklistSaga() {
    yield takeEvery(
        deleteDeviceFromBlacklistAction.TYPE,
        function* (action: typeof deleteDeviceFromBlacklistAction.typeOf.action) {
            const { stage, deviceId } = action;
            try {
                yield call(deleteDeviceBlacklist, stage, deviceId);

                const listUrlMatch = DEVICE_BLACKLIST_LIST_URL.match(location, true);
                if (listUrlMatch.isMatched) {
                    yield fork(loadDeviceBlacklist, stage, listUrlMatch.query || {});
                }
            } catch (error) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to delete device ID: ${deviceId} from blacklist. ${(
                            error as Error
                        ).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
