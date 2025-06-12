import { postCreatePageRow } from "features/content-moderation/services";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { CREATE_PAGE_LIST_URL } from "urls";
import { upsertSingleCreatePageRowAction } from "../actions";
import { loadCreatePageRows } from "./watchCreatePageListSaga";

const POP_UP_KEY = "CREATE PAGE ROW UPDATE";

export function* upsertSingleCreatePageRowSaga() {
    yield takeEvery(
        upsertSingleCreatePageRowAction.TYPE,
        function* (action: typeof upsertSingleCreatePageRowAction.typeOf.action) {
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

                yield call(postCreatePageRow, action.stage, data);

                yield put(
                    addPopUpMessageAction({
                        messageStyle: "success",
                        messageText: `Item "${data.title}" ${actionType}`,
                        key: POP_UP_KEY,
                        duration: 2
                    })
                );

                const urlMatch = CREATE_PAGE_LIST_URL.match(location);
                if (urlMatch.isMatched) {
                    yield spawn(loadCreatePageRows, action.stage, urlMatch.query || {});
                    return;
                }

                yield spawn(loadCreatePageRows, action.stage, { id: data?.id });
            } catch (e) {
                yield put(
                    addPopUpMessageAction({
                        messageStyle: "error",
                        key: POP_UP_KEY,
                        duration: 5,
                        messageText: `Failed to ${actionType} item (${data.title}). ${(e as Error).message}`
                    })
                );
            }
        }
    );
}
