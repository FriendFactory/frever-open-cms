import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, spawn, takeEvery } from "redux-saga/effects";

import { checkUserAccess } from "shared/checkUserAccess";
import { COLD_START_URL, VIDEO_MODERATION_LIST_URL } from "urls";
import { videoModerationListLoadAction } from "../actions";
import { loadVideoListByIdArray } from "./videoListWorkers/loadVideoListByIdArray";
import { loadVideoListByParams } from "./videoListWorkers/loadVideoListByParams";
import { GetVideoListParams } from "features/video-moderation/services";

export function* watchLoadVideoModerationList() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = VIDEO_MODERATION_LIST_URL.match(action.payload.location, true);
        if (urlMatch.isMatched) {
            const hasAccess: boolean = yield call(checkUserAccess, "VideoModeration");
            if (!hasAccess) return;
            yield spawn(loadVideoModerationList, urlMatch.params.stage, urlMatch.query || {});
        }

        const coldStartMatch = COLD_START_URL.match(action.payload.location, true);
        if (coldStartMatch.isMatched) {
            const hasAccess: boolean = yield call(checkUserAccess, "VideoModeration");
            if (!hasAccess) return;

            yield spawn(loadVideoModerationList, coldStartMatch.params.stage, {
                ...(coldStartMatch.query || {}),
                isStartListItem: "true"
            });
        }
    });

    yield takeEvery(
        videoModerationListLoadAction.TYPE,
        function* (action: typeof videoModerationListLoadAction.typeOf.action) {
            const hasAccess: boolean = yield call(checkUserAccess, "VideoModeration");
            if (!hasAccess) return;
            yield spawn(loadVideoModerationList, action.stage, action.params);
        }
    );
}

export function* loadVideoModerationList(stage: string, params: GetVideoListParams) {
    yield Array.isArray(params.video)
        ? spawn(loadVideoListByIdArray, stage, params)
        : spawn(loadVideoListByParams, stage, params);
}
