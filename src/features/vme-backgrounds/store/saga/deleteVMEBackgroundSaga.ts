import { call, put, takeEvery } from "redux-saga/effects";

import { deleteVMEBackgroundAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { vmeBackgroundListPageWorker } from "./watchVMEBackgroundListSaga";
import { deleteVMEBackground } from "features/vme-backgrounds/services";

const POP_UP_KEY = "VME BACKGROUND DELETE";

export function* deleteVMEBackgroundSaga() {
    yield takeEvery(deleteVMEBackgroundAction.TYPE, function* (action: typeof deleteVMEBackgroundAction.typeOf.action) {
        const { stage, data } = action;

        try {
            yield put(
                addPopUpMessageAction({
                    messageStyle: "loading",
                    messageText: "Pending...",
                    key: POP_UP_KEY,
                    duration: 0
                })
            );

            yield call(deleteVMEBackground, stage, data.id);

            yield* vmeBackgroundListPageWorker(location);

            yield put(
                addPopUpMessageAction({
                    messageStyle: "success",
                    messageText: `VME Background item "${data.name}" was deleted`,
                    key: POP_UP_KEY
                })
            );
        } catch (e) {
            yield put(
                addPopUpMessageAction({
                    messageStyle: "error",
                    key: POP_UP_KEY,
                    duration: 5,
                    messageText: `Failed to delete VME Background item (${data.name}). ${(e as Error).message}`
                })
            );
        }
    });
}
