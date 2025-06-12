import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { postEntity } from "shared";
import { botInfoLoadedOkAction, upsertBotAction } from "../actions";
import { Bot } from "features/bots-moderation/services";
import { addPopUpMessageAction } from "shared/store";
import { BOT_LIST_PAGE_URL } from "urls";
import { loadBotList } from "./watchBotListSaga";

export function* watchBotUpsertSaga() {
    yield takeEvery(upsertBotAction.TYPE, function* (action: typeof upsertBotAction.typeOf.action) {
        yield* handleUpsertBotInfo(action.stage, action.data as Bot);
    });
}

export function* handleUpsertBotInfo(stage: string, bot: Bot) {
    try {
        const result: Bot = yield call(postEntity, stage, "bot", bot);

        const listPageMatch = BOT_LIST_PAGE_URL.match(location);
        if (listPageMatch.isMatched) {
            yield spawn(loadBotList, listPageMatch.params.stage, listPageMatch.query || {});
        } else {
            yield put(
                botInfoLoadedOkAction({
                    stage,
                    id: result.id,
                    result
                })
            );
        }
    } catch (e) {
        yield put(
            addPopUpMessageAction({
                messageText: `Failed to post bot. ${(e as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
