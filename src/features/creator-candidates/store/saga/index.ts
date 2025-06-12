import { all } from "redux-saga/effects";

import { executeCreatorCandidateCommandSaga } from "./executeCreatorCandidateCommand.saga";
import { watchCreatorCandidateListSaga } from "./watch.CreatorCandidateList.saga";

export function* creatorCandidatesSaga() {
    yield all([watchCreatorCandidateListSaga(), executeCreatorCandidateCommandSaga()]);
}
