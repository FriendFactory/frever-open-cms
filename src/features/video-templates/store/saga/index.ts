import { all } from "redux-saga/effects";

import { watchTemplateListSaga } from "./watch.TemplateList.saga";
import { watchTemplateSaga } from "./watch.Template.saga";
import { watchUpdateTemplateInfoSaga } from "./watch.UpdateTemplateInfo.saga";

import { watchDeleteTemplatesSaga } from "./watch.DeleteTemplates.saga";
import { watchTemplateSortingModeSaga } from "./watch.TemplateSortingMode.saga";
import { watchUpdateSortingOrderSaga } from "./watch.UpdateSortingOrder.saga";

export function* templateSaga() {
    yield all([
        watchTemplateListSaga(),
        watchTemplateSaga(),
        watchUpdateTemplateInfoSaga(),
        watchDeleteTemplatesSaga(),
        watchTemplateSortingModeSaga(),
        watchUpdateSortingOrderSaga()
    ]);
}
