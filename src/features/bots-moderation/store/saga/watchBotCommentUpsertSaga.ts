import { call, put, select, spawn, takeEvery } from "redux-saga/effects";

import { updateBotCommentAction, upsertBotCommentAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { BOT_COMMENT_LIST_PAGE_URL, BOT_DETAILS_PAGE_URL } from "urls";
import { loadBotCommentList } from "./watchBotCommentListSaga";
import { AppState } from "app-state";
import { botKeySelector } from "../reducer/bot";
import { handleUpdateBotCommentsSaga } from "./watchUpdateBotCommentsSaga";
import { BotComment } from "features/bots-moderation/services";
import { postEntity } from "shared";

const COMMENT_UPSERT_KEY = "COMMENT_UPSERT_KEY";

export function* watchBotCommentUpsertSaga() {
    yield takeEvery(upsertBotCommentAction.TYPE, function* (action: typeof upsertBotCommentAction.typeOf.action) {
        try {
            yield put(
                addPopUpMessageAction({
                    messageText: `Pending...`,
                    messageStyle: "loading",
                    duration: 0,
                    key: COMMENT_UPSERT_KEY
                })
            );

            const result: BotComment = yield call(postEntity, action.stage, "bot/comment", action.data);

            yield put(updateBotCommentAction({ stage: action.stage, result }));

            const botCommentListUrlMatch = BOT_COMMENT_LIST_PAGE_URL.match(location);
            if (botCommentListUrlMatch.isMatched) {
                yield spawn(
                    loadBotCommentList,
                    botCommentListUrlMatch.params.stage,
                    botCommentListUrlMatch.query || {}
                );
            }

            const botDetailsUrlMatch = BOT_DETAILS_PAGE_URL.match(location);
            if (botDetailsUrlMatch.isMatched) {
                const appState: AppState = yield select();

                const bot =
                    appState.bots.entities[
                        botKeySelector(botDetailsUrlMatch.params.stage, botDetailsUrlMatch.params.id)
                    ];

                if (bot?.comments) {
                    yield* handleUpdateBotCommentsSaga(action.stage, bot.id, [result.id, ...bot.comments]);
                }
            }

            yield put(
                addPopUpMessageAction({
                    messageText: "Success",
                    messageStyle: "success",
                    key: COMMENT_UPSERT_KEY
                })
            );
        } catch (e) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to post bot. ${(e as Error).toString()}`,
                    messageStyle: "error",
                    key: COMMENT_UPSERT_KEY
                })
            );
        }
    });
}
