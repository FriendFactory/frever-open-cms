declare const CONFIG_API_SERVERS: string;
declare const CONFIG_API_URL: string;

export const API_SERVERS = JSON.parse(CONFIG_API_SERVERS) as ServerConfiguration[];
export const API_URL = CONFIG_API_URL;

export type ServerConfiguration = {
    id: string;
    ordinal: number;
    title: string;
    auth_server: string;
    version: string;
    secret: string;
};

export const getAssetMigrateId = () => API_SERVERS.find((service) => service.id === "content-stage")?.id;

export * from "./assets";
export * from "./assetsDeleteBy";
export * from "./fileExtensions";
export * from "./categories";
export * from "./features";
export * from "./no-image-url";
