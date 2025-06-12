import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { executeVideoCommandByHashtagAction } from "../actions";
import { executeVideoCommandByHashag } from "features/video-moderation/services";
import { VIDEO_MODERATION_LIST_URL } from "urls";
import { loadVideoModerationList } from "./watchLoadVideoModerationList.saga";

export function* watchExecVideoComdByHashtagSaga() {
    yield takeEvery(
        executeVideoCommandByHashtagAction.TYPE,
        function* (action: typeof executeVideoCommandByHashtagAction.typeOf.action) {
            const key = `${action.body.HashtagId}/${action.command}`;

            try {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Pending`,
                        messageStyle: "loading",
                        duration: 0,
                        key
                    })
                );

                yield call(executeVideoCommandByHashag, action.stage, action.command, action.body);

                yield put(
                    addPopUpMessageAction({
                        messageText: `Pending`,
                        messageStyle: "success",
                        key
                    })
                );

                const urlMatch = VIDEO_MODERATION_LIST_URL.match(location, true);
                if (urlMatch.isMatched) {
                    yield spawn(loadVideoModerationList, urlMatch.params.stage, urlMatch.query || {});
                }
            } catch (responseError) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to ${action.command}. ${(responseError as Error).toString()}`,
                        messageStyle: "error",
                        key
                    })
                );
            }
        }
    );
}
