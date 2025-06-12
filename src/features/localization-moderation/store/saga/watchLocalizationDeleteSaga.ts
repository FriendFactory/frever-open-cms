import { call, put, takeEvery } from "redux-saga/effects";

import { deleteLocalization } from "features/localization-moderation/services";
import { addPopUpMessageAction } from "shared/store";
import { localizationListPageWorker } from "./watchLocalizationListSaga";
import { localizationDeleteAction } from "../actions";

const LOCALIZATION_DELETE_KEY = "LOCALIZATION_DELETE_KEY";

export function* watchLocalizationDeleteSaga() {
    yield takeEvery(localizationDeleteAction.TYPE, function* (action: typeof localizationDeleteAction.typeOf.action) {
        try {
            yield put(
                addPopUpMessageAction({
                    messageText: `Pending...`,
                    messageStyle: "loading",
                    duration: 0,
                    key: LOCALIZATION_DELETE_KEY
                })
            );

            yield call(deleteLocalization, action.stage, action.key);

            yield* localizationListPageWorker(location);

            yield put(
                addPopUpMessageAction({
                    messageText: `Success. Localization ${action.key} key was deleted`,
                    messageStyle: "success",
                    key: LOCALIZATION_DELETE_KEY
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to delete ${action.key} localization. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
