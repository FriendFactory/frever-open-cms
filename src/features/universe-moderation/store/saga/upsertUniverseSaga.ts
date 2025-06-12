import { all, call, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { upsertUniversesAction, upsertUniversesOkAction } from "../actions";
import { postUniverse, Universe } from "features/universe-moderation/services";

const POP_UP_KEY = "UNIVERSE UPDATE";

export function* upsertUniverseSaga() {
    yield takeEvery(upsertUniversesAction.TYPE, function* (action: typeof upsertUniversesAction.typeOf.action) {
        const list = [...action.items];

        yield put(
            addPopUpMessageAction({
                messageStyle: "loading",
                messageText: "Pending...",
                key: POP_UP_KEY,
                duration: 0
            })
        );

        const result: Universe[] = [];
        const failed: Universe[] = [];

        for (let i = 0; i < list.length; i += 4) {
            const slice = list.slice(i, i + 4);

            yield all(
                slice.map(function* (data) {
                    try {
                        const newItem: Universe = yield call(postUniverse, action.stage, data);
                        newItem;
                        result.push(data);
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
            upsertUniversesOkAction({
                stage: action.stage,
                data: result
            })
        );
    });
}
