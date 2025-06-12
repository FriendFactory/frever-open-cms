import { request } from "shared/request";

export const deleteDeviceBlacklist = async (stage: string, deviceId: string): Promise<string> => {
    const response = await request(stage).assetmanager().delete(`api/device-blacklist`, { data: { deviceId } });

    if (response.status === 204) return deviceId;

    throw new Error(`Status code: ${response.status}`);
};
