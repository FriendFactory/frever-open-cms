import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { deleteEntity } from "shared";
import { BOT_LIST_PAGE_URL, BOT_DETAILS_PAGE_URL } from "urls";
import { loadBotList } from "./watchBotListSaga";
import { deleteBotAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";

export function* watchDeleteBotSaga() {
    yield takeEvery(deleteBotAction.TYPE, function* (action: typeof deleteBotAction.typeOf.action) {
        try {
            yield call(deleteEntity, action.stage, "bot", action.botId);

            yield put(
                addPopUpMessageAction({
                    messageText: "Success. Bot was deleted",
                    messageStyle: "success"
                })
            );

            const listUrlMatch = BOT_LIST_PAGE_URL.match(location, true);
            if (listUrlMatch.isMatched) {
                yield spawn(loadBotList, listUrlMatch.params.stage, listUrlMatch.query || {});
            }

            const botDetailsUrlMatch = BOT_DETAILS_PAGE_URL.match(location, true);
            if (botDetailsUrlMatch.isMatched) history.back();
        } catch (e) {
            yield put(
                addPopUpMessageAction({
                    messageText: "Failed. Bot was not deleted.",
                    messageStyle: "error"
                })
            );
        }
    });
}
