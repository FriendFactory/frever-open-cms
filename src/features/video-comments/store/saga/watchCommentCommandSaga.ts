import { all, call, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { deleteComment, VideoComment } from "../../services";
import { commentCommandFinishedAction, executeCommentCommandAction } from "../actions";

export function* watchCommentCommandSaga() {
    yield takeEvery(
        executeCommentCommandAction.TYPE,
        function* (action: typeof executeCommentCommandAction.typeOf.action) {
            const comments: VideoComment[] = yield all(
                action.comments.map(function* (comment) {
                    try {
                        yield call(deleteComment, action.stage, comment.videoId, comment.id);
                        return { ...comment, isDeleted: !comment.isDeleted };
                    } catch (responseError) {
                        yield put(
                            addPopUpMessageAction({
                                messageText: `Failed to change video comment status. Comment ID: ${comment.id}). ${(
                                    responseError as Error
                                ).toString()}`,
                                messageStyle: "error"
                            })
                        );
                        return comment;
                    }
                })
            );

            yield put(commentCommandFinishedAction({ stage: action.stage, comments }));
        }
    );
}
