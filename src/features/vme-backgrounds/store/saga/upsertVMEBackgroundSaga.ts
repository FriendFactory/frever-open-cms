import { all, call, put, takeEvery } from "redux-saga/effects";

import { upsertVMEBackgroundAction, upsertVMEBackgroundOkAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { updateVMEBackground, VMEBackground } from "features/vme-backgrounds/services";

const POP_UP_KEY = "VME BACKGROUND UPDATE";

export function* upsertVMEBackgroundSaga() {
    yield takeEvery(upsertVMEBackgroundAction.TYPE, function* (action: typeof upsertVMEBackgroundAction.typeOf.action) {
        const list = [...action.items];

        yield put(
            addPopUpMessageAction({
                messageStyle: "loading",
                messageText: "Pending...",
                key: POP_UP_KEY,
                duration: 0
            })
        );

        const result: VMEBackground[] = [];
        const failed: VMEBackground[] = [];

        for (let i = 0; i < list.length; i += 4) {
            const slice = list.slice(i, i + 4);

            yield all(
                slice.map(function* (data) {
                    try {
                        const newItem: VMEBackground = yield call(
                            updateVMEBackground,
                            action.stage,

                            data
                        );

                        result.push(newItem);
                    } catch (e) {
                        failed.push(data);
                    }
                })
            );
        }

        yield put(
            addPopUpMessageAction({
                messageStyle: failed.length ? "info" : "success",
                messageText: failed.length
                    ? `Some items weren't updated. (${failed.map((el) => el.name).join(" ,")})`
                    : "Sorting changes saved",
                key: POP_UP_KEY,
                duration: 2
            })
        );

        yield put(
            upsertVMEBackgroundOkAction({
                stage: action.stage,
                data: result
            })
        );
    });
}
