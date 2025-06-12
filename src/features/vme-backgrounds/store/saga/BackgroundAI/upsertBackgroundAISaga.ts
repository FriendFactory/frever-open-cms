import { all, call, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { BackgroundAI, updateBackgroundAI } from "features/vme-backgrounds/services";
import { upsertBackgroundAIAction, upsertBackgroundAIOkAction } from "../../actions/BackgroundAI";

const POP_UP_KEY = "AI BACKGROUND UPDATE";

export function* upsertBackgroundAISaga() {
    yield takeEvery(upsertBackgroundAIAction.TYPE, function* (action: typeof upsertBackgroundAIAction.typeOf.action) {
        const list = [...action.items];

        yield put(
            addPopUpMessageAction({
                messageStyle: "loading",
                messageText: "Pending...",
                key: POP_UP_KEY,
                duration: 0
            })
        );

        const result: BackgroundAI[] = [];
        const failed: BackgroundAI[] = [];

        for (let i = 0; i < list.length; i += 4) {
            const slice = list.slice(i, i + 4);

            yield all(
                slice.map(function* (data) {
                    try {
                        const newItem: BackgroundAI = yield call(updateBackgroundAI, action.stage, data);
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
            upsertBackgroundAIOkAction({
                stage: action.stage,
                data: result
            })
        );
    });
}
