import { all } from "redux-saga/effects";

import { watchVideoLeaderboardListSaga } from "./watchVideoLeaderboardListSaga";

export function* videoLeaderboardSaga() {
    yield all([watchVideoLeaderboardListSaga()]);
}
