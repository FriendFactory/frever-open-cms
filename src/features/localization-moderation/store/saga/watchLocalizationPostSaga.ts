import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { postLocalization } from "features/localization-moderation/services";
import { addPopUpMessageAction } from "shared/store";
import { loadLocalizationList, localizationListPageWorker } from "./watchLocalizationListSaga";
import { localizationPostAction } from "../actions";

const LOCALIZATION_POST_KEY = "LOCALIZATION_POST_KEY";

export function* watchLocalizationPostSaga() {
    yield takeEvery(localizationPostAction.TYPE, function* (action: typeof localizationPostAction.typeOf.action) {
        try {
            yield put(
                addPopUpMessageAction({
                    messageText: `Pending...`,
                    messageStyle: "loading",
                    duration: 0,
                    key: LOCALIZATION_POST_KEY
                })
            );

            yield call(postLocalization, action.stage, action.data);

            if (action.postType === "add") {
                yield* localizationListPageWorker(location);
            } else {
                yield spawn(loadLocalizationList, action.stage, { key: action.data.key });
            }

            yield put(
                addPopUpMessageAction({
                    messageText: "Success. Localization Key has been added/updated.",
                    messageStyle: "success",
                    key: LOCALIZATION_POST_KEY
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to add/update ${action.data.key} localization. ${(
                        responseError as Error
                    ).toString()}`,
                    messageStyle: "error",
                    key: LOCALIZATION_POST_KEY
                })
            );
        }
    });
}
