import { all } from "redux-saga/effects";
import { executeReportedVideoCommandSaga } from "./executeReportedVideoCommand.saga";
import { watchReportVideoListSaga } from "./watchLoadReportVideoList.saga";

export function* reportVideoSaga() {
    yield all([watchReportVideoListSaga(), executeReportedVideoCommandSaga()]);
}
