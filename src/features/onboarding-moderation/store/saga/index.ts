import { all } from "redux-saga/effects";
import { watchOnboardingListSaga } from "./watchOnboardingListSaga";
import { watchOnboardingDetailsSaga } from "./watchOnboardingDetailsSaga";
import { watchUpdateOnboardingEntity } from "./watchUpdateOnboardingEntity";
import { watchLoadOnboardingEntities } from "./watchLoadOnboardingEntities";
import { watchOnboardingQuestTypeSaga } from "./watchOnboardingQuestTypeSaga";
import { watchLocalizationImportSaga } from "./watchLocalizationImportSaga";

export function* onboardingSaga() {
    yield all([
        watchOnboardingListSaga(),
        watchOnboardingDetailsSaga(),
        watchOnboardingQuestTypeSaga(),
        watchUpdateOnboardingEntity(),
        watchLoadOnboardingEntities(),
        watchLocalizationImportSaga()
    ]);
}
