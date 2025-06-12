import { Action } from "redux";

import { CrewRewards } from "../../../services";
import { crewRewardsListLoadedOkAction, updateCrewRewardsList } from "../../actions";

export interface ReportMessageEntitiesState {
    [x: string]: CrewRewards | undefined;
}

export const crewRewardsEntitiesReducer = (
    state: ReportMessageEntitiesState | undefined,
    action: Action
): ReportMessageEntitiesState => {
    if (!state) {
        state = {};
    }

    if (crewRewardsListLoadedOkAction.is(action)) {
        return action.result.data.reduce<ReportMessageEntitiesState>(
            (acc, el) => {
                acc[crewRewardsKeySelector(action.stage, el.id)] = el;
                return acc;
            },
            { ...state }
        );
    }

    if (updateCrewRewardsList.is(action)) {
        const key = crewRewardsKeySelector(action.stage, action.data.id);

        const updatedEntity = { ...state[key], ...action.data };

        return {
            ...state,
            [key]: updatedEntity
        };
    }

    return state;
};

export const crewRewardsKeySelector = (stage: string, id: number) => `${stage}/crew-rewards/${id}`;
