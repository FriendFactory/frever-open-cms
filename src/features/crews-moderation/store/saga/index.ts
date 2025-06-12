import { all } from "redux-saga/effects";

import { watchCrewsListSaga } from "./watchCrewsListSaga";
import { watchLoadCrewInfoSaga } from "./watchLoadCrewInfoSaga";
import { updateCrewInfoSaga } from "./updateCrewSaga";
import { watchCrewRewardsListSaga } from "./watchCrewRewardsListSaga";
import { watchPostCrewRewardEntitySaga } from "./watchPostCrewRewardEntitySaga";
import { deleteCrewSagaSaga } from "./deleteCrewSaga";

export function* crewsSaga() {
    yield all([
        watchCrewsListSaga(),
        watchLoadCrewInfoSaga(),
        updateCrewInfoSaga(),
        watchCrewRewardsListSaga(),
        watchPostCrewRewardEntitySaga(),
        deleteCrewSagaSaga()
    ]);
}
