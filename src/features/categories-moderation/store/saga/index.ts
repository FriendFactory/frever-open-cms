import { all } from "redux-saga/effects";

import { watchCreateEditorSettingsSaga } from "./watch.CreateEditorSettings.saga";
import { watchDeleteEditorSettingsSaga } from "./watch.DeleteEditorSettings.saga";
import { watchEditorSettingsDetailsSaga } from "./watch.EditorSettingsDetails.saga";
import { watchUpdateEditorSettingsSaga } from "./watch.UpdateEditorSettings.saga";
import { watchGeoClustersListSaga } from "./watchGeoClustersListSaga";
import { watchGeoClustersDetailsSaga } from "./watchGeoClustersDetailsSaga";
import { watchUpdateGeoClusterSaga } from "./watchUpdateGeoClusterSaga";
import { watchCreateGeoClusterSaga } from "./watchCreateGeoClusterSaga";

export function* categoriesSaga() {
    yield all([
        watchEditorSettingsDetailsSaga(),
        watchUpdateEditorSettingsSaga(),
        watchDeleteEditorSettingsSaga(),
        watchCreateEditorSettingsSaga(),
        watchGeoClustersListSaga(),
        watchGeoClustersDetailsSaga(),
        watchUpdateGeoClusterSaga(),
        watchCreateGeoClusterSaga()
    ]);
}
