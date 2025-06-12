import { Action } from "redux";
import { StateHash } from "rd-redux-utils";

import { BattleReward } from "features/video-tasks/services";
import {
    battleRewardsActionGroup,
    battleRewardsLoadingAction,
    battleRewardsLoadedOkAction,
    battleRewardsLoadedErrorAction,
    battleRewardsUpdatedOkAction
} from "../actions";

export interface TaskBattleRewardsState {
    loading: boolean;
    error?: string;
    data?: BattleReward[];
}

const listReducer = battleRewardsActionGroup.hashedReducer(
    (props) => taskBattleRewardsSelector(props.stage, props.taskId),
    (state: TaskBattleRewardsState | undefined, action: Action): TaskBattleRewardsState => {
        if (!state) {
            state = { loading: false };
        }

        if (battleRewardsLoadingAction.is(action)) {
            return {
                ...state,
                loading: true
            };
        }

        if (battleRewardsLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (battleRewardsLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                data: action.result
            };
        }

        return state;
    }
);

export function updateBattleRewardInListReducer(
    state: StateHash<TaskBattleRewardsState>,
    action: Action
): StateHash<TaskBattleRewardsState> {
    if (battleRewardsUpdatedOkAction.is(action)) {
        return Object.entries(state).reduce<StateHash<TaskBattleRewardsState>>((result, [key, value]) => {
            const data = value.data?.map(
                (el) => action.result.find((updatedReward) => updatedReward.id === el.id) ?? el
            );
            result[key] = { ...value, data };
            return result;
        }, {});
    }
    return state;
}

export const taskBattleRewardsReducer = function (
    state: StateHash<TaskBattleRewardsState>,
    action: Action
): StateHash<TaskBattleRewardsState> {
    const updatedState = listReducer(state, action);
    return updateBattleRewardInListReducer(updatedState, action);
};

export const taskBattleRewardsSelector = (stage: string, taskId: number) => `task-battle-rewards/${stage}/${taskId}`;
