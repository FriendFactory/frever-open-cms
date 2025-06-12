import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { ResultWithCount } from "shared";
import {
    getQuestGroupList,
    getQuestList,
    getRewardList,
    OnboardingQuest,
    OnboardingQuestGroup,
    OnboardingReward,
    QuestGroupListQueryParams,
    QuestListQueryParams,
    RewardListQueryParams
} from "features/onboarding-moderation/services";
import {
    loadEntityListAction,
    questGroupListLoadedErrorAction,
    questGroupListLoadedOkAction,
    questGroupListLoadingAction,
    questListLoadedErrorAction,
    questListLoadedOkAction,
    questListLoadingAction,
    rewardListLoadedErrorAction,
    rewardListLoadedOkAction,
    rewardListLoadingAction
} from "../actions";

export function* watchLoadOnboardingEntities() {
    yield takeEvery(loadEntityListAction.TYPE, function* (action: typeof loadEntityListAction.typeOf.action) {
        switch (action.entityType) {
            case "quest":
                yield spawn(loadQuestList, action.stage, action.params);
                break;
            case "questGroup":
                yield spawn(loadQuestGroupList, action.stage, action.params);
                break;
            case "reward":
                yield spawn(loadRewardList, action.stage, action.params as any);
                break;
            default:
                break;
        }
    });
}

export function* loadQuestGroupList(stage: string, params: QuestGroupListQueryParams) {
    try {
        yield put(questGroupListLoadingAction({ stage, params }));

        const result: ResultWithCount<OnboardingQuestGroup> = yield call(getQuestGroupList, stage, params);

        yield put(questGroupListLoadedOkAction({ stage, params, result }));
    } catch (e) {
        yield put(questGroupListLoadedErrorAction({ error: (e as Error).message, stage, params }));
    }
}

export function* loadRewardList(stage: string, params: RewardListQueryParams) {
    try {
        yield put(rewardListLoadingAction({ stage, params }));

        const result: ResultWithCount<OnboardingReward> = yield call(getRewardList, stage, params || {});

        yield put(rewardListLoadedOkAction({ stage, params, result }));
    } catch (e) {
        yield put(rewardListLoadedErrorAction({ error: (e as Error).message, stage, params }));
    }
}

export function* loadQuestList(stage: string, params: QuestListQueryParams) {
    try {
        yield put(questListLoadingAction({ stage, params }));

        const result: ResultWithCount<OnboardingQuest> = yield call(getQuestList, stage, params || {});

        yield put(questListLoadedOkAction({ stage, params, result }));
    } catch (e) {
        yield put(questListLoadedErrorAction({ error: (e as Error).message, stage, params }));
    }
}
