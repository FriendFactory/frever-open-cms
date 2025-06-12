import { call, fork, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { updateSpawnFormation } from "features/spawn-formation/services";
import { updateSpawnFormationAction } from "../actions";
import { loadSpawnFormationList } from "./watchSpawnFormationListSaga";

export function* watchUpdateSpawnFormationSaga() {
    yield takeEvery(
        updateSpawnFormationAction.TYPE,
        function* (action: typeof updateSpawnFormationAction.typeOf.action) {
            try {
                yield call(updateSpawnFormation, action.stage, action.data);

                yield fork(loadSpawnFormationList, action.stage, { id: action.data.id });

                yield put(
                    addPopUpMessageAction({
                        messageText: `CharacterSpawnPositionFormation updated successfully.`,
                        messageStyle: "success"
                    })
                );
            } catch (responseError) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to update CharacterSpawnPositionFormation. ${(
                            responseError as Error
                        ).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
