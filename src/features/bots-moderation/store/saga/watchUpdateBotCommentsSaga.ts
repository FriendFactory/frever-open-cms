import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { updateBotCommentsAction } from "../actions";
import { postEntity } from "shared";
import { loadBotInfo } from "./watchBotInfoSaga";
import { addPopUpMessageAction } from "shared/store";

export function* watchUpdateBotCommentsSaga() {
    yield takeEvery(updateBotCommentsAction.TYPE, function* (action: typeof updateBotCommentsAction.typeOf.action) {
        yield* handleUpdateBotCommentsSaga(action.stage, action.botId, action.comments);
    });
}

export function* handleUpdateBotCommentsSaga(stage: string, botId: number, comments: number[]) {
    try {
        yield call(postEntity, stage, `bot/${botId}/comments`, comments);
        yield spawn(loadBotInfo, stage, botId);
    } catch (e) {
        yield put(
            addPopUpMessageAction({
                messageText: "Failed. Bot was not updated.",
                messageStyle: "error"
            })
        );
    }
}
