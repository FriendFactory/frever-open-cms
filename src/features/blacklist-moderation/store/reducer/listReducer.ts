import { AppState } from "app-state";
import { hashKeySelector, pageKeySelector } from "utils";
import { DEFAULT_DEVICE_BLACKLIST_LIST_SIZE } from "urls";
import { createListPageHashedReducer } from "shared/store";
import {
    deviceBlacklistActionGroup,
    deviceBlacklistLoadedErrorAction,
    deviceBlacklistLoadedOkAction,
    deviceBlacklistLoadingAction
} from "../actions/deviceBlacklist";
import { deviceBlacklistKeySelector } from "./entitiesReducer";
import { DeviceBlacklistQueryParams } from "features/blacklist-moderation";
import { calculateListTotal } from "shared/calculate-list-total";

export const listReducer = createListPageHashedReducer({
    group: deviceBlacklistActionGroup,
    loading: deviceBlacklistLoadingAction,
    loadedError: deviceBlacklistLoadedErrorAction,
    loadedOk: deviceBlacklistLoadedOkAction,
    keyFactory: (stage, device) => deviceBlacklistKeySelector(stage, device.deviceId)
});

export const deviceBlacklistListSelector =
    (stage: string, params: DeviceBlacklistQueryParams) => (appState: AppState) => {
        const state = appState.deviceBlacklist.list[hashKeySelector(stage, params)];
        const page = state?.pages?.[pageKeySelector(params.skip)];

        const data = page?.map((el) => appState.deviceBlacklist.entities[el]!).filter(Boolean);

        const pageSize = Number(params?.take ?? DEFAULT_DEVICE_BLACKLIST_LIST_SIZE);

        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;

        return {
            loading: state?.loading ?? false,
            error: state?.error,
            data,
            pageSize,
            currentPage,
            total: calculateListTotal(page?.length ?? 0, params.skip, pageSize)
        };
    };
