import { getQuestTypeList } from "features/onboarding-moderation/services/getQuestTypeList";
import { call, put, takeEvery } from "redux-saga/effects";

import { checkUserAccess } from "shared/checkUserAccess";
import { questTypeListLoadedErrorAction, questTypeListLoadedOkAction, questTypeListLoadingAction } from "../actions";

export function* watchOnboardingQuestTypeSaga() {
    yield takeEvery(
        questTypeListLoadingAction.TYPE,
        function* (action: typeof questTypeListLoadingAction.typeOf.action) {
            const hasAccess: boolean = yield call(checkUserAccess, "Seasons");
            if (!hasAccess) return;

            const { stage } = action;

            try {
                const data: string[] = yield call(getQuestTypeList, stage);
                yield put(questTypeListLoadedOkAction({ stage, data }));
            } catch (e) {
                yield put(questTypeListLoadedErrorAction({ stage, error: (e as Error).message }));
            }
        }
    );
}
