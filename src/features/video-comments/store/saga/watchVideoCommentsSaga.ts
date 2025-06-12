import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, takeEvery } from "redux-saga/effects";
import { checkUserAccess } from "shared/checkUserAccess";

import { VIDEO_MODERATION_COMMENTS_URL, USER_COMMENTS_TAB_URL } from "urls";

import { videoCommentsWorker } from "./videoCommentsWorker";

export function* watchVideoCommentsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        // Load comments for the Comments tab on the Video page
        const videoUrlMatch = VIDEO_MODERATION_COMMENTS_URL.match(action.payload.location, true);
        if (videoUrlMatch.isMatched) {
            const hasAccess: boolean = yield call(checkUserAccess, "VideoModeration");
            if (!hasAccess) return;
            yield* videoCommentsWorker(videoUrlMatch.params.stage, {
                videoId: videoUrlMatch.params.id,
                ...videoUrlMatch.query
            });
        }

        // Load comments for the Comments tab on the User page
        const userUrlMatch = USER_COMMENTS_TAB_URL.match(action.payload.location, true);
        if (userUrlMatch.isMatched) {
            const hasAccess: boolean = yield call(checkUserAccess, "VideoModeration");
            if (!hasAccess) return;
            yield* videoCommentsWorker(userUrlMatch.params.stage, {
                group: userUrlMatch.params.id,
                ...userUrlMatch.query
            });
        }
    });
}
