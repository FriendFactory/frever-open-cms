import { all } from "redux-saga/effects";

import { watchCreatorCodesListSaga } from "./watchCreatorCodesListSaga";
import { watchCreatorCodeUpsertSaga } from "./watchCreatorCodeUpsertSaga";
import { watchCreatorMessagesSaga } from "./watchCreatorMessagesSaga";
import { watchCreatorMessageUpsertSaga } from "./watchCreatorMessageUpsertSaga";
import { changeCreatorCodeStatusSaga } from "./changeCreatorCodeStatusSaga";

export function* friendCodesSaga() {
    yield all([
        watchCreatorCodesListSaga(),
        watchCreatorCodeUpsertSaga(),
        watchCreatorMessagesSaga(),
        watchCreatorMessageUpsertSaga(),
        changeCreatorCodeStatusSaga()
    ]);
}
