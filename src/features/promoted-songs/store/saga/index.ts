import { all } from "redux-saga/effects";

import { watchPromotedSongDeleteSaga } from "./watchPromotedSongDeleteSaga";
import { watchPromotedSongListSaga } from "./watchPromotedSongListSaga";
import { watchPostPromotedSongSaga } from "./watchPostPromotedSongSaga";

export function* promotedSongSaga() {
    yield all([watchPromotedSongListSaga(), watchPostPromotedSongSaga(), watchPromotedSongDeleteSaga()]);
}
