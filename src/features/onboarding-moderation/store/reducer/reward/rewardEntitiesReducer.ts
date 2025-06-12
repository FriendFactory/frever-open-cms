import { Action } from "redux";

import { rewardListLoadedOkAction } from "../../actions";
import { OnboardingReward } from "features/onboarding-moderation/services";

export interface RewardEntitiesState {
    [x: string]: OnboardingReward | undefined;
}

export const rewardEntitiesReducer = (state: RewardEntitiesState | undefined, action: Action): RewardEntitiesState => {
    if (!state) {
        state = {};
    }

    if (rewardListLoadedOkAction.is(action)) {
        return action.result.data.reduce<RewardEntitiesState>(
            (acc, el) => {
                acc[rewardKeySelector(action.stage, el.id)] = el;
                return acc;
            },
            { ...state }
        );
    }

    return state;
};

export const rewardKeySelector = (stage: string, id: number) => `${stage}/onboarding-reward/${id}`;
