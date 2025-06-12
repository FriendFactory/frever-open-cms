import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, takeEvery } from "redux-saga/effects";

import { ResultWithCount } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { REPORTED_VIDEO_LIST_URL } from "urls";
import { getReportedVideoList, ReportedVideoInfo } from "features/reported-videos/services";
import {
    reportVideoListLoadedErrorAction,
    reportVideoListLoadedOkAction,
    reportVideoListLoadingAction
} from "../actions/reportedVideoList";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchReportVideoListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = REPORTED_VIDEO_LIST_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "VideoModeration");
        if (!hasAccess) return;

        const actionParams = { stage: urlMatch.params.stage, params: urlMatch.query || {} };

        try {
            yield put(reportVideoListLoadingAction(actionParams));

            const result: ResultWithCount<ReportedVideoInfo> = yield call(
                getReportedVideoList,
                urlMatch.params.stage,
                urlMatch.query || {}
            );

            yield put(
                reportVideoListLoadedOkAction({
                    ...actionParams,
                    result
                })
            );
        } catch (e) {
            yield put(
                reportVideoListLoadedErrorAction({
                    error: (e as Error).toString(),
                    ...actionParams
                })
            );

            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to load Reported Video List. ${(e as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
