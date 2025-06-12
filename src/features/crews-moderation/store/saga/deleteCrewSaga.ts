import { call, put, takeEvery } from "redux-saga/effects";

import { deleteCrewAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { loadCrewsList } from "./watchCrewsListSaga";
import { deleteEntity } from "shared";

export function* deleteCrewSagaSaga() {
    yield takeEvery(deleteCrewAction.TYPE, function* (action: typeof deleteCrewAction.typeOf.action) {
        const { stage, data } = action;

        try {
            yield call(deleteEntity, stage, "crew/moderation", data.id);

            yield* loadCrewsList(stage, { id: data.id });
        } catch (e) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to delete crew. ${(e as Error).message}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
