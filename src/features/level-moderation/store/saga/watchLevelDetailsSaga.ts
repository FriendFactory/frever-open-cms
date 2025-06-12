import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";

import { getLevelList, Level, LevelEvent } from "../../services";
import { LEVEL_DETAILS_URL } from "urls";
import { levelDetailsLoadingAction, levelDetailsLoadedOkAction, levelDetailsLoadedErrorAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { getVideoIdByLevelId } from "features/user-moderation/services/getVideoIdByLevelId";
import { checkUserAccess } from "shared/checkUserAccess";

export function* loadLevel(stage: string, id: number) {
    try {
        yield put(levelDetailsLoadingAction({ stage, id }));

        const resultList: Level[] = yield call(getLevelList, stage, { id });
        const resultVideoIdOfLevel: Level[] = yield all(
            resultList.map(function* (el) {
                try {
                    const videoId: number | undefined = yield call(getVideoIdByLevelId, stage, el.id);
                    return { ...el, videoId };
                } catch (e) {
                    return el;
                }
            })
        );

        const result = resultVideoIdOfLevel[0];

        if (!result) {
            throw new Error("Level not found");
        }
        // Controllers are not included in the Level API. We clean up empty arrays to not rewrite controllers in the event if this event is already loaded.
        result.event = result.event.map((el) => removeEventControllers(el));

        yield put(
            levelDetailsLoadedOkAction({
                stage,
                id,
                result
            })
        );
    } catch (responseError) {
        yield put(
            levelDetailsLoadedErrorAction({
                stage,
                id,
                error: (responseError as Error).toString()
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the level details. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}

export function* watchLevelDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = LEVEL_DETAILS_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        const { stage, id } = urlMatch.params;

        yield fork(loadLevel, stage, id);
    });
}

const removeEventControllers = (event: LevelEvent) => {
    const {
        characterController,
        vfxController,
        cameraController,
        setLocationController,
        cameraFilterController,
        musicController,
        ...restEvent
    } = event;

    return restEvent;
};
