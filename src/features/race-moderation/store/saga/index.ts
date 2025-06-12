import { all } from "redux-saga/effects";

import { upsertSingleRaceSaga } from "./upsertSingleRaceSaga";
import { watchRaceDetailsSaga } from "./watchRaceDetailsSaga";
import { watchRaceListSaga } from "./watchRaceListSaga";

export function* raceSaga() {
    yield all([watchRaceListSaga(), watchRaceDetailsSaga(), upsertSingleRaceSaga()]);
}
