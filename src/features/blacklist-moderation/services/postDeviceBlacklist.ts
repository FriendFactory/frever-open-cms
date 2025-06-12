import { request } from "shared/request";
import { DeviceBlacklistEntity, ShortDeviceData } from "./api";

export const postDeviceBlacklist = async (stage: string, data: ShortDeviceData): Promise<DeviceBlacklistEntity> => {
    const response = await request(stage).assetmanager().post(`api/device-blacklist`, data);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
