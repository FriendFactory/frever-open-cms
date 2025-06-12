import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { StarCreatorWelcomeMessage, creatorMessageUpsert } from "../../services";
import { creatorMessageUpsertAction, creatorMessageUpsertFinishedAction } from "../actions/creatorMessages";
import { loadCreatorMessages } from "./watchCreatorMessagesSaga";
import { CREATOR_WELCOME_MESSAGES_PAGE } from "urls";

export function* watchCreatorMessageUpsertSaga() {
    yield takeEvery(
        creatorMessageUpsertAction.TYPE,
        function* (action: typeof creatorMessageUpsertAction.typeOf.action) {
            try {
                const data: StarCreatorWelcomeMessage = yield call(creatorMessageUpsert, action.stage, action.data);

                yield put(creatorMessageUpsertFinishedAction({ stage: action.stage, data }));

                yield put(
                    addPopUpMessageAction({
                        messageText: "Success. Star Creator message added/updated",
                        messageStyle: "success"
                    })
                );

                const urlMatch = CREATOR_WELCOME_MESSAGES_PAGE.match(location, true);
                if (urlMatch.isMatched) yield spawn(loadCreatorMessages, urlMatch.params.stage, urlMatch.query || {});
            } catch (responseError) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to add/update star creator message. ${(
                            responseError as Error
                        ).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
