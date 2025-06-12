import { all } from "redux-saga/effects";

import { watchUserListSaga } from "./watch.UserList.saga";
import { watchBlockUserSaga } from "./watch.BlockUser.saga";
import { watchUserDetailsSaga } from "./watch.UserDetails.saga";
import { watchEditUserDataSaga } from "./watch.EditUserData.saga";
import { watchSoftDeleteUserSaga } from "./watch.SoftDeleteUser.saga";
import { watchUserFollowerListSaga } from "./watch.UserFollowerList.saga";
import { watchEditUserContactDataSaga } from "./watch.EditUserContactData.saga";
import { watchEditUserGroupDataSaga } from "./watch.EditUserGroupData.saga";
import { watchBoostUserStatsSaga } from "./watchBoostUserStatsSaga";
import { watchHardDeleteUserSaga } from "./watch.HardDeleteUser.saga";
import { watchPurchasedAssetsSaga } from "./watch.PurchasedAssets.saga";
import { watchUserActivitySaga } from "./watchUserActivitySaga";

export function* userSaga() {
    yield all([
        watchUserListSaga(),
        watchBlockUserSaga(),
        watchUserDetailsSaga(),
        watchEditUserContactDataSaga(),
        watchEditUserDataSaga(),
        watchSoftDeleteUserSaga(),
        watchUserFollowerListSaga(),
        watchEditUserGroupDataSaga(),
        watchBoostUserStatsSaga(),
        watchHardDeleteUserSaga(),
        watchPurchasedAssetsSaga(),
        watchUserActivitySaga()
    ]);
}
