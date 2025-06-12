import { EventOfLevel } from "features/video-moderation/services";
import { call, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { getEventsOfLevel } from "../../services";
import {
    eventsOfLevelLoadAction,
    eventsOfLevelLoadedErrorAction,
    eventsOfLevelLoadedOkAction,
    eventsOfLevelLoadingAction
} from "../actions";

export function* watchEventsOfLevelSaga() {
    yield takeEvery(eventsOfLevelLoadAction.TYPE, function* (action: typeof eventsOfLevelLoadAction.typeOf.action) {
        const { stage, levelId } = action;
        try {
            yield put(eventsOfLevelLoadingAction({ stage: stage, levelId: levelId }));

            const result: EventOfLevel[] = yield call(getEventsOfLevel, stage, levelId);

            yield put(
                eventsOfLevelLoadedOkAction({
                    stage,
                    levelId,
                    result
                })
            );
        } catch (responseError) {
            yield put(
                eventsOfLevelLoadedErrorAction({
                    error: (responseError as Error).toString(),
                    stage,
                    levelId
                })
            );

            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to load the Events of Level ${levelId}. ${(
                        responseError as Error
                    ).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
