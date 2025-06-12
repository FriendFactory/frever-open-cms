import { call, fork, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { MASS_SEND_OUTS_LIST_PAGE_URL } from "urls";
import { deleteScheduledMessageAction } from "../actions/scheduledMessageList";
import { deleteScheduledMessage } from "features/community-moderation/services/scheduledMessage/deleteScheduledMessage";
import { loadScheduledMessage } from "./watchScheduledMessageListSaga";

export function* watchDeleteScheduledMessageSaga() {
    yield takeEvery(
        deleteScheduledMessageAction.TYPE,
        function* (action: typeof deleteScheduledMessageAction.typeOf.action) {
            const { stage, id } = action;
            try {
                yield call(deleteScheduledMessage, stage, id);

                const listUrlMatch = MASS_SEND_OUTS_LIST_PAGE_URL.match(location, true);
                if (listUrlMatch.isMatched) {
                    yield fork(loadScheduledMessage, stage, listUrlMatch.query || {});
                }
            } catch (error) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to delete scheduled message ID: ${id}. ${(error as Error).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
