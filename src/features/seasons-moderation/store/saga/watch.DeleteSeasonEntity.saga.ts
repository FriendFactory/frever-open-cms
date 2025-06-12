import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { SeasonEntityPathToFieldName } from "features/seasons-moderation/services";
import { deleteEntity } from "shared/services";
import { addPopUpMessageAction } from "shared/store";
import { deleteSeasonEntityAction } from "../actions";
import { loadSeasonDetails } from "./watch.SeasonDetails.saga";

export function* watchDeleteSeasonEntitySaga() {
    yield takeEvery(deleteSeasonEntityAction.TYPE, function* (action: typeof deleteSeasonEntityAction.typeOf.action) {
        const { id, seasonId } = action.entity;

        try {
            yield call(deleteEntity, action.stage, SeasonEntityPathToFieldName[action.entityName], id);

            if (!seasonId) {
                yield put(
                    addPopUpMessageAction({
                        messageText: "Failed to update season info. Please, reload the page",
                        messageStyle: "error"
                    })
                );
                return;
            }

            yield spawn(loadSeasonDetails, action.stage, seasonId);
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to delete ${action.entityName}. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
