import { ReportedVideoInfo } from "features/reported-videos/services";
import { executeReportedVideoCommand } from "features/reported-videos/services/executeReportedVideoCommand";
import { call, put, takeEvery } from "redux-saga/effects";
import { addPopUpMessageAction } from "shared/store";
import { executeReportVideoCommandAction, updateReportVideoListAction } from "../actions";

export function* executeReportedVideoCommandSaga() {
    yield takeEvery(
        executeReportVideoCommandAction.TYPE,
        function* (action: typeof executeReportVideoCommandAction.typeOf.action) {
            const { stage, command, report } = action;
            try {
                const result: ReportedVideoInfo = yield call(executeReportedVideoCommand, stage, report, command);

                if (!result) {
                    yield put(
                        addPopUpMessageAction({
                            messageText: "Failed to update reported video. Please, reload the page",
                            messageStyle: "error"
                        })
                    );
                    return;
                }

                yield put(updateReportVideoListAction({ stage, result }));
            } catch (e) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to execute command: "${command}". ${(e as Error).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
