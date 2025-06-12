import { AdminAccessScope } from "features/permission-moderation/services";
import { Action } from "redux";
import { getCurrentStageTab } from "shared/services";
import { updateSideMenuCurrentEnvAction, updateSideMenuParamsAction } from "../actions/sideMenu";

export interface SideMenuState {
    accessScope?: AdminAccessScope[];
    selectedKeys?: string[];
    stage: string;
}

export const sideMenuReducer = (state: SideMenuState | undefined, action: Action): SideMenuState => {
    if (!state) {
        return {
            stage: getCurrentStageTab()
        };
    }

    if (updateSideMenuParamsAction.is(action)) {
        return {
            accessScope: action.accessScope,
            selectedKeys: action.selectedKeys,
            stage: action.stage
        };
    }

    if (updateSideMenuCurrentEnvAction.is(action)) {
        return {
            ...state,
            stage: action.stage
        };
    }

    return state;
};
