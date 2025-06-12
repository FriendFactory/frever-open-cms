import { all } from "redux-saga/effects";

import { watchCommentCommandSaga } from "./watchCommentCommandSaga";
import { watchVideoCommentsSaga } from "./watchVideoCommentsSaga";

export function* videoCommentsSaga() {
    yield all([watchCommentCommandSaga(), watchVideoCommentsSaga()]);
}
