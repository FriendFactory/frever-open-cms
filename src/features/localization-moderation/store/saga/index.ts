import { all } from "redux-saga/effects";

import { watchLocalizationListSaga } from "./watchLocalizationListSaga";
import { watchLocalizationPostSaga } from "./watchLocalizationPostSaga";
import { watchLocalizationDeleteSaga } from "./watchLocalizationDeleteSaga";
import { watchLocalizationImportSaga } from "./watchLocalizationImportSaga";

export function* localizationSaga() {
    yield all([
        watchLocalizationListSaga(),
        watchLocalizationPostSaga(),
        watchLocalizationDeleteSaga(),
        watchLocalizationImportSaga()
    ]);
}
