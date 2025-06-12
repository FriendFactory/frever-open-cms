import { all } from "redux-saga/effects";

import { watchBotListSaga } from "./watchBotListSaga";
import { watchBotInfoSaga } from "./watchBotInfoSaga";
import { watchBotUpsertSaga } from "./watchBotUpsertSaga";
import { watchBotCommentUpsertSaga } from "./watchBotCommentUpsertSaga";
import { watchBotCommentListSaga } from "./watchBotCommentListSaga";
import { watchUpdateBotCommentsSaga } from "./watchUpdateBotCommentsSaga";
import { watchDeleteBotSaga } from "./watchDeleteBotSaga";
import { watchDeleteBotCommentSaga } from "./watchDeleteBotCommentSaga";

export function* botsModerationSaga() {
    yield all([
        watchBotListSaga(),
        watchBotInfoSaga(),
        watchBotUpsertSaga(),
        watchBotCommentUpsertSaga(),
        watchBotCommentListSaga(),
        watchUpdateBotCommentsSaga(),
        watchDeleteBotSaga(),
        watchDeleteBotCommentSaga()
    ]);
}
