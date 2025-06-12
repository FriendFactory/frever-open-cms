import { call, put, takeEvery } from "redux-saga/effects";

import { emotionsListLoadAction, upsertEmotionsAction, upsertEmotionsOkAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { updateEmotions } from "features/emotion-moderation/services/updateEmotions";
import { Emotion } from "features/emotion-moderation/services";
import { EMOTIONS_LIST_URL } from "urls";

const EMOTIONS_UPSERT_KEY = "EMOTIONS_UPSERT_KEY";

export function* watchUpsertEmotionSaga() {
    yield takeEvery(upsertEmotionsAction.TYPE, function* (action: typeof upsertEmotionsAction.typeOf.action) {
        yield* handleUpsertEmotion(action.stage, action.data as Emotion);
    });
}

export function* handleUpsertEmotion(stage: string, data: Emotion) {
    try {
        yield put(
            addPopUpMessageAction({
                messageText: `Pending...`,
                messageStyle: "loading",
                duration: 0,
                key: EMOTIONS_UPSERT_KEY
            })
        );

        const emotion: Emotion = yield call(updateEmotions, stage, data);

        yield put(
            upsertEmotionsOkAction({
                stage,
                data: [emotion]
            })
        );

        const emotionListUrlMatch = EMOTIONS_LIST_URL.match(location);
        if (emotionListUrlMatch.isMatched) {
            yield put(
                emotionsListLoadAction({
                    stage: emotionListUrlMatch.params.stage,
                    params: emotionListUrlMatch.query || {}
                })
            );
        }

        yield put(
            addPopUpMessageAction({
                messageText: "Success",
                messageStyle: "success",
                key: EMOTIONS_UPSERT_KEY
            })
        );
    } catch (e) {
        yield put(
            addPopUpMessageAction({
                messageText: `Failed to post emotion. ${(e as Error).toString()}`,
                messageStyle: "error",
                key: EMOTIONS_UPSERT_KEY
            })
        );
    }
}
