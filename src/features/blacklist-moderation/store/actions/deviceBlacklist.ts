import { defineAction, defineActionGroup } from "rd-redux-utils";

import { DeviceBlacklistEntity, DeviceBlacklistQueryParams, ShortDeviceData } from "features/blacklist-moderation";

export const deviceBlacklistActionGroup =
    defineActionGroup<{ stage: string; params: DeviceBlacklistQueryParams }>("DEVICE BLACKLIST");

export const deviceBlacklistLoadingAction = deviceBlacklistActionGroup.defineAction("LOADING");

export const deviceBlacklistLoadedOkAction =
    deviceBlacklistActionGroup.defineAction<{ data: DeviceBlacklistEntity[] }>("LOADED OK");

export const deviceBlacklistLoadedErrorAction =
    deviceBlacklistActionGroup.defineAction<{ error: string }>("LOADED ERROR");

export const addDeviceToBlacklistAction = defineAction<{ stage: string; data: ShortDeviceData }>(
    "DEVICE BLACKLIST: ADD TO BLACKLIST"
);

export const deleteDeviceFromBlacklistAction = defineAction<{ stage: string; deviceId: string }>(
    "DEVICE BLACKLIST: DELETE FROM BLACKLIST"
);
