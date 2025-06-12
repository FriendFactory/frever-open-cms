import { all } from "redux-saga/effects";

import { watchAddDeviceToBlacklistSaga } from "./watchAddDeviceToBlacklistSaga";
import { watchDeleteDeviceFromBlacklistSaga } from "./watchDeleteDeviceFromBlacklistSaga";
import { watchDeviceBlacklistListSaga } from "./watchDeviceBlacklistListSaga";

export function* deviceBlacklistSaga() {
    yield all([watchDeviceBlacklistListSaga(), watchAddDeviceToBlacklistSaga(), watchDeleteDeviceFromBlacklistSaga()]);
}
