import { call, put, takeEvery } from "redux-saga/effects";

import {
    ChatMessageReport,
    executeReportedChatMessageCommand,
    getReportedMessageList
} from "features/reported-messages/services";
import { executeReportMessageCommand, updateMessageListAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { ResultWithCount } from "shared";

export function* watchReportedChatMessageCommandSaga() {
    yield takeEvery(
        executeReportMessageCommand.TYPE,
        function* (action: typeof executeReportMessageCommand.typeOf.action) {
            const { stage, command, report } = action;

            try {
                yield call(executeReportedChatMessageCommand, stage, report, command);

                const reportedMessage: ResultWithCount<ChatMessageReport> = yield call(getReportedMessageList, stage, {
                    id: report.id.toString()
                });

                const result = reportedMessage.data[0];

                if (!result) {
                    yield put(
                        addPopUpMessageAction({
                            messageText: "Failed to update reported message. Please, reload the page",
                            messageStyle: "error"
                        })
                    );
                    return;
                }

                yield put(updateMessageListAction({ stage, result }));
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
