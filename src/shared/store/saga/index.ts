import { all } from "redux-saga/effects";

import { watchPopUpMessageSaga } from "./watch.PopUpMessage.saga";
import { watchExtraDataSaga } from "./watch.ExtraData.saga";
import { watchUpdateEntitySaga } from "./watch.UpdateEntity.saga";
import { watchCreateEntitySaga } from "./watch.CreateEntity.saga";
import { watchDeleteEntitySaga } from "./watch.DeleteEntity.saga";
import { watchSideMenuAcessScopeSaga } from "./watchSideMenuSaga";

export function* sharedSaga() {
    yield all([
        watchPopUpMessageSaga(),
        watchExtraDataSaga(),
        watchUpdateEntitySaga(),
        watchCreateEntitySaga(),
        watchDeleteEntitySaga(),
        watchSideMenuAcessScopeSaga()
    ]);
}
