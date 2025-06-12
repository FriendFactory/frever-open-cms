import { Action } from "redux";

import { questGroupListLoadedOkAction } from "../../actions";
import { OnboardingQuestGroup } from "features/onboarding-moderation/services";

export interface QuestGroupEntitiesState {
    [x: string]: OnboardingQuestGroup | undefined;
}

export const questGroupEntitiesReducer = (
    state: QuestGroupEntitiesState | undefined,
    action: Action
): QuestGroupEntitiesState => {
    if (!state) {
        state = {};
    }

    if (questGroupListLoadedOkAction.is(action)) {
        return action.result.data.reduce<QuestGroupEntitiesState>(
            (acc, el) => {
                acc[questGroupKeySelector(action.stage, el.id)] = el;
                return acc;
            },
            { ...state }
        );
    }

    return state;
};

export const questGroupKeySelector = (stage: string, id: number) => `${stage}/onboarding-quest-group/${id}`;
