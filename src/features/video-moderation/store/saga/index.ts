import { all } from "redux-saga/effects";
import { watchLoadVideoModerationDetails } from "./watchLoadVideoModerationDetails.saga";
import { watchLoadVideoModerationList } from "./watchLoadVideoModerationList.saga";
import { watchSetVideoSoftDeleted } from "./watchSetSoftDeleted";
import { watchLoadCloserVideosIds } from "./watchLoadCloserVideosIds.saga";
import { watchExcuteVideoCommandSaga } from "./watchExecuteVideoCommand.saga";
import { watchExecVideoComdByHashtagSaga } from "./watchExecVideoComdByHashtag.saga";
import { watchEventsOfLevelSaga } from "./watch.EventsOfLevel.saga";
import { watchCreateTemplateSaga } from "./watch.CreateTemplate.saga";
import { watchPatchVideoCommandSaga } from "./watchPatchVideoCommandSaga";

export function* videoModerationListSaga() {
    yield all([
        watchLoadVideoModerationList(),
        watchLoadVideoModerationDetails(),
        watchSetVideoSoftDeleted(),
        watchLoadCloserVideosIds(),
        watchExcuteVideoCommandSaga(),
        watchPatchVideoCommandSaga(),
        watchExecVideoComdByHashtagSaga(),
        watchEventsOfLevelSaga(),
        watchCreateTemplateSaga()
    ]);
}
