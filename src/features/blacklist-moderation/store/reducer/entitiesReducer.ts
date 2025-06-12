import { Action } from "redux";

import { DeviceBlacklistEntity } from "features/blacklist-moderation";
import { reduceState } from "utils";
import { deviceBlacklistLoadedOkAction } from "../actions/deviceBlacklist";

export interface DeviceBlacklistState {
    [key: string]: DeviceBlacklistEntity | undefined;
}

export const entitiesReducer = (state: DeviceBlacklistState | undefined, action: Action): DeviceBlacklistState => {
    if (!state) {
        state = {};
    }

    if (deviceBlacklistLoadedOkAction.is(action)) {
        return {
            ...state,
            ...reduceState(action.data, (id) => deviceBlacklistKeySelector(action.stage, id), "deviceId")
        };
    }

    return state;
};

export const deviceBlacklistKeySelector = (stage: string, id: number | string) => `${stage}/device-blacklist/${id}`;
