import { call, spawn, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";

import { PHOTO_DETAILS_URL, USERSOUND_DETAILS_URL, VIDEOCLIP_DETAILS_URL } from "urls";
import { loadUserMediaFileEntityWorker } from "./loadUserMediaFileEntityWorker";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchLoadUserMediaFile() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const photoPageUrlMatch = PHOTO_DETAILS_URL.match(action.payload.location);
        if (photoPageUrlMatch.isMatched) {
            const hasAccess: boolean = yield call(checkUserAccess, "Social");
            if (!hasAccess) return;

            yield spawn(
                loadUserMediaFileEntityWorker,
                photoPageUrlMatch.params.stage,
                "Photo",
                photoPageUrlMatch.params.id
            );
        }

        const videoClipsPageUrlMatch = VIDEOCLIP_DETAILS_URL.match(action.payload.location);
        if (videoClipsPageUrlMatch.isMatched) {
            const hasAccess: boolean = yield call(checkUserAccess, "Social");
            if (!hasAccess) return;

            yield spawn(
                loadUserMediaFileEntityWorker,
                videoClipsPageUrlMatch.params.stage,
                "VideoClip",
                videoClipsPageUrlMatch.params.id
            );
        }

        const soundsPageUrlMatch = USERSOUND_DETAILS_URL.match(action.payload.location);
        if (soundsPageUrlMatch.isMatched) {
            const hasAccess: boolean = yield call(checkUserAccess, "Social");
            if (!hasAccess) return;

            yield spawn(
                loadUserMediaFileEntityWorker,
                soundsPageUrlMatch.params.stage,
                "UserSound",
                soundsPageUrlMatch.params.id
            );
        }
    });
}
