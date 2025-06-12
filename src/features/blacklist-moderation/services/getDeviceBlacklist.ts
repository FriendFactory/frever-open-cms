import qs from "query-string";

import { request } from "shared/request";
import { DEFAULT_DEVICE_BLACKLIST_LIST_SIZE } from "urls";
import { DeviceBlacklistEntity } from "./api";

export interface DeviceBlacklistQueryParams {
    search?: string;
    skip?: number;
    take?: number;
}

export const getDeviceBlacklist = async (
    stage: string,
    params: DeviceBlacklistQueryParams
): Promise<DeviceBlacklistEntity[]> => {
    let query = qs.stringify({
        skip: params.skip ?? 0,
        take: params.take ?? DEFAULT_DEVICE_BLACKLIST_LIST_SIZE,
        search: params?.search
    });

    const response = await request(stage).assetmanager().get(`api/device-blacklist?${query}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
