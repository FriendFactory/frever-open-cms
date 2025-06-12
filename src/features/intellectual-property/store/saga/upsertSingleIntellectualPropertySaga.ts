import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { upsertSingleIntellectualPropertyAction } from "../actions";
import { postIntellectualProperty } from "features/intellectual-property/services";
import { loadIntellectualPropertyList } from "./watchIntellectualPropertyListSaga";

const POP_UP_KEY = "INTELLECTUAL PROPERTY UPDATE";

export function* upsertSingleIntellectualPropertySaga() {
    yield takeEvery(
        upsertSingleIntellectualPropertyAction.TYPE,
        function* (action: typeof upsertSingleIntellectualPropertyAction.typeOf.action) {
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

                yield call(postIntellectualProperty, action.stage, data);

                yield put(
                    addPopUpMessageAction({
                        messageStyle: "success",
                        messageText: `Intellectual Property item "${data.name}" ${actionType}`,
                        key: POP_UP_KEY,
                        duration: 2
                    })
                );

                yield spawn(loadIntellectualPropertyList, action.stage, { id: data?.id });
            } catch (e) {
                yield put(
                    addPopUpMessageAction({
                        messageStyle: "error",
                        key: POP_UP_KEY,
                        duration: 5,
                        messageText: `Failed to ${actionType} Intellectual Property item (${data.name}). ${
                            (e as Error).message
                        }`
                    })
                );
            }
        }
    );
}
