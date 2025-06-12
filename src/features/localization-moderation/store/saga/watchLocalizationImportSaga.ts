import { call, put, takeEvery } from "redux-saga/effects";

import { importLocalizationCSV } from "features/localization-moderation/services";
import { addPopUpMessageAction } from "shared/store";
import { localizationListPageWorker } from "./watchLocalizationListSaga";
import { localizationImportAction } from "../actions";

const LOCALIZATION_IMPORT_KEY = "LOCALIZATION_IMPORT_KEY";

export function* watchLocalizationImportSaga() {
    yield takeEvery(localizationImportAction.TYPE, function* (action: typeof localizationImportAction.typeOf.action) {
        const { stage, importType, csvFile } = action;
        try {
            yield put(
                addPopUpMessageAction({
                    messageText: `Pending...`,
                    messageStyle: "loading",
                    duration: 0,
                    key: LOCALIZATION_IMPORT_KEY
                })
            );

            yield call(importLocalizationCSV, stage, importType, csvFile);

            yield* localizationListPageWorker(location);

            yield put(
                addPopUpMessageAction({
                    messageText: "Success. Localization has been imported.",
                    messageStyle: "success",
                    key: LOCALIZATION_IMPORT_KEY
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to import (${importType}) localization. ${(
                        responseError as Error
                    ).toString()}`,
                    messageStyle: "error",
                    key: LOCALIZATION_IMPORT_KEY
                })
            );
        }
    });
}
