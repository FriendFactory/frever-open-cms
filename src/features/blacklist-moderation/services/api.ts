export interface DeviceBlacklistEntity {
    deviceId: string;
    blockedAt: string;
    blockedByGroupId: number;
    blockedByGroupName: string;
    reason: string;
}

export interface ShortDeviceData extends Pick<DeviceBlacklistEntity, "deviceId" | "reason"> {}
