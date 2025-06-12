import { getActiveStageById } from "./stages";

export interface Credentials {
    email: string;
    verification_token?: string;
}

export interface AuthData {
    access_token: string;
    expires_in: number;
    token_type: "Bearer";
    scope: string;
    server_url: string;
    asset_server: string;
    transcoding_server: string;
    video_server: string;
    social_server: string;
    assetmanager_server: string;
    client_server: string;
    notification_server: string;
}

export const AUTH_SERVER_STORAGE_KEY = "FREVER_AUTH";

export const addServerVersion = (serverURL: string, version: string) => {
    const regex = /__VERSION__/g;
    return serverURL.replace(regex, version);
};

export const removeServerVersion = (serverURL: string) => {
    const regex = /\/\d+(\.\d+)*\//g;
    return serverURL.replace(regex, "/__VERSION__/");
};

const serverKeys = [
    "server_url",
    "asset_server",
    "transcoding_server",
    "video_server",
    "social_server",
    "assetmanager_server",
    "client_server",
    "notification_server"
] as const;

export function getServerAuth(serverId: string): AuthData | undefined {
    const storedToken = JSON.parse(localStorage.getItem(AUTH_SERVER_STORAGE_KEY) ?? "{}");
    const authData = storedToken[serverId];
    const version = getActiveStageById(serverId)?.version;

    if (!version || !authData) return;

    serverKeys.forEach((serverKey) => {
        authData[serverKey] = addServerVersion(authData[serverKey], version);
    });

    return authData;
}

export function setServerAuth(serverId: string, authData: AuthData) {
    if (!serverId) throw new Error("Server ID is not defined");

    serverKeys.forEach((serverKey) => {
        authData[serverKey] = removeServerVersion(authData[serverKey]);
    });

    const storedToken = JSON.parse(localStorage.getItem(AUTH_SERVER_STORAGE_KEY) ?? "{}");
    storedToken[serverId] = authData;

    localStorage.setItem(AUTH_SERVER_STORAGE_KEY, JSON.stringify(storedToken));
}

export function resetAuth() {
    localStorage.removeItem(AUTH_SERVER_STORAGE_KEY);
}

export function getCurrentEnvs() {
    const storedToken = JSON.parse(localStorage.getItem(AUTH_SERVER_STORAGE_KEY) ?? "{}");
    return Object.keys(storedToken);
}
