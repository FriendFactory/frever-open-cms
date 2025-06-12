import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { deleteBotCommentAction } from "../actions";
import { deleteEntity } from "shared";
import { BOT_COMMENT_LIST_PAGE_URL, BOT_DETAILS_PAGE_URL } from "urls";
import { loadBotCommentList } from "./watchBotCommentListSaga";
import { loadBotInfo } from "./watchBotInfoSaga";
import { addPopUpMessageAction } from "shared/store";

export function* watchDeleteBotCommentSaga() {
    yield takeEvery(deleteBotCommentAction.TYPE, function* (action: typeof deleteBotCommentAction.typeOf.action) {
        try {
            yield call(deleteEntity, action.stage, "bot/comment", action.botCommentId);

            yield put(
                addPopUpMessageAction({
                    messageText: "Success. Bot comment was deleted",
                    messageStyle: "success"
                })
            );

            const listUrlMatch = BOT_COMMENT_LIST_PAGE_URL.match(location, true);
            if (listUrlMatch.isMatched) {
                yield spawn(loadBotCommentList, listUrlMatch.params.stage, listUrlMatch.query || {});
            }

            const botDetailsUrlMatch = BOT_DETAILS_PAGE_URL.match(location, true);
            if (botDetailsUrlMatch.isMatched) {
                yield spawn(loadBotInfo, botDetailsUrlMatch.params.stage, botDetailsUrlMatch.params.id);
            }
        } catch (e) {
            yield put(
                addPopUpMessageAction({
                    messageText: "Failed. Bot comment was not deleted.",
                    messageStyle: "error"
                })
            );
        }
    });
}
