import { call, put, takeEvery } from "redux-saga/effects";

import { importLocalizationCSV } from "features/onboarding-moderation/services/importLocalizationCSV";
import { addPopUpMessageAction } from "shared/store";
import { ONBOARDING_QUEST_GROUP_LIST_PAGE_URL } from "urls";
import { localizationImportAction } from "../actions";
import { loadQuestGroupList } from "./watchLoadOnboardingEntities";

const LOCALIZATION_IMPORT_KEY = "ONBOARDING_LOCALIZATION_IMPORT_KEY";

export function* watchLocalizationImportSaga() {
    yield takeEvery(localizationImportAction.TYPE, function* (action: typeof localizationImportAction.typeOf.action) {
        const { stage, importType, csvFile } = action;
        try {
            yield put(
                addPopUpMessageAction({
                    messageText: `Pending...`,
                    messageStyle: "loading",
                    duration: 0,
                    key: LOCALIZATION_IMPORT_KEY
                })
            );

            yield call(importLocalizationCSV, stage, importType, csvFile);

            yield* updatePage();

            yield put(
                addPopUpMessageAction({
                    messageText: "Success. Localization has been imported.",
                    messageStyle: "success",
                    key: LOCALIZATION_IMPORT_KEY
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to import (${importType}) localization. ${(
                        responseError as Error
                    ).toString()}`,
                    messageStyle: "error",
                    key: LOCALIZATION_IMPORT_KEY
                })
            );
        }
    });
}

function* updatePage() {
    const questGroupListPage = ONBOARDING_QUEST_GROUP_LIST_PAGE_URL.match(location, true);

    if (questGroupListPage.isMatched) {
        yield* loadQuestGroupList(questGroupListPage.params.stage, questGroupListPage.query || {});
    }
}
