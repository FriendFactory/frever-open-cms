import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { postRace } from "features/race-moderation/services";
import { addPopUpMessageAction } from "shared/store";
import { upsertSingleRaceAction } from "../actions";
import { loadRaceList } from "./watchRaceListSaga";

const POP_UP_KEY = "RACE UPDATE";

export function* upsertSingleRaceSaga() {
    yield takeEvery(upsertSingleRaceAction.TYPE, function* (action: typeof upsertSingleRaceAction.typeOf.action) {
        const data = action.data;

        const actionType = "id" in data ? "updated" : "created";

        try {
            yield put(
                addPopUpMessageAction({
                    messageStyle: "loading",
                    messageText: "Pending...",
                    key: POP_UP_KEY,
                    duration: 0
                })
            );

            yield call(postRace, action.stage, data);

            yield put(
                addPopUpMessageAction({
                    messageStyle: "success",
                    messageText: `Race item "${data.name}" ${actionType}`,
                    key: POP_UP_KEY,
                    duration: 2
                })
            );

            yield spawn(loadRaceList, action.stage, { id: data?.id });
        } catch (e) {
            yield put(
                addPopUpMessageAction({
                    messageStyle: "error",
                    key: POP_UP_KEY,
                    duration: 5,
                    messageText: `Failed to ${actionType} Race item (${data.name}). ${(e as Error).message}`
                })
            );
        }
    });
}
