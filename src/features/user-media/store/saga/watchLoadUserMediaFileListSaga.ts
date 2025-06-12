import { call, spawn, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";

import { USER_PHOTO_LIST_TAB_URL, USER_SOUND_LIST_TAB_URL, USER_VIDEOCLIP_LIST_TAB_URL } from "urls";
import { loadUserMediaFileListWorker } from "./loadUserMediaFileListWorker";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchLoadUserMediaFileListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const photoPageUrlMatch = USER_PHOTO_LIST_TAB_URL.match(action.payload.location);
        if (photoPageUrlMatch.isMatched) {
            const hasAccess: boolean = yield call(checkUserAccess, "Social");
            if (!hasAccess) return;

            yield spawn(
                loadUserMediaFileListWorker,
                photoPageUrlMatch.params.stage,
                "Photo",
                photoPageUrlMatch.query || {}
            );
        }

        const videoClipsPageUrlMatch = USER_VIDEOCLIP_LIST_TAB_URL.match(action.payload.location);
        if (videoClipsPageUrlMatch.isMatched) {
            const hasAccess: boolean = yield call(checkUserAccess, "Social");
            if (!hasAccess) return;

            yield spawn(
                loadUserMediaFileListWorker,
                videoClipsPageUrlMatch.params.stage,
                "VideoClip",
                videoClipsPageUrlMatch.query || {}
            );
        }

        const soundsPageUrlMatch = USER_SOUND_LIST_TAB_URL.match(action.payload.location);
        if (soundsPageUrlMatch.isMatched) {
            const hasAccess: boolean = yield call(checkUserAccess, "Social");
            if (!hasAccess) return;

            yield spawn(
                loadUserMediaFileListWorker,
                soundsPageUrlMatch.params.stage,
                "UserSound",
                soundsPageUrlMatch.query || {}
            );
        }
    });
}
