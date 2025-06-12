import { call, put } from "redux-saga/effects";
import { Actions, executeVideosDelete, SelectBy } from "shared/services/executeVideosDelete";

import { addPopUpMessageAction } from "shared/store";

export function* executeVideosDeleteSaga(stage: string, selectBy: SelectBy, id: number, command: Actions) {
    try {
        yield call(executeVideosDelete, stage, selectBy, id, command);
    } catch (error) {
        yield put(
            addPopUpMessageAction({
                messageText: `Failed to execute action "${command === "post" ? "Restore" : "Delete"} with videos". ${
                    (error as Error).message
                }`,
                messageStyle: "error"
            })
        );
    }
}
