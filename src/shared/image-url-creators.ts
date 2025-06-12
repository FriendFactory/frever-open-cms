import { getServerAuth } from "features/auth";

export interface ThumbnailFile {
    source?: {
        uploadId: string;
        copyFrom?: null;
    };
    version: string | null;
    file: number;
    extension: number;
    resolution: string;
    tags?: string[] | null;
}

export interface ThumbnailsUrlFromFilesProps {
    id: string | number;
    entityType: string;
    stage: string;
    resolution: "64x64" | "128x128" | "256x256" | "512x512" | "1024x1024" | "1600x900";
    files: Array<ThumbnailFile>;
}

export interface ThumbnailsUrlFromFileProps {
    id: string | number;
    entityType: string;
    stage: string;
    file: ThumbnailFile;
}

export const createCdnURLFromFiles = ({ id, files, entityType, stage, resolution }: ThumbnailsUrlFromFilesProps) => {
    const version = files.find((file) => file.resolution === resolution)?.version;

    const serverUrl = getServerAuth(stage)?.asset_server;

    if (version && serverUrl) return `${serverUrl}api/Cdn/${entityType}/${id}/Thumbnail/${resolution}/${version}`;

    return "";
};

export const createCdnURLFromFile = ({ id, file, entityType, stage }: ThumbnailsUrlFromFileProps) => {
    const serverUrl = getServerAuth(stage)?.asset_server;

    if (file.file === 1 && serverUrl) {
        return `${serverUrl}api/Cdn/${entityType}/${id}/Thumbnail/${file.resolution ?? ""}/${file.version ?? ""}`;
    }
    return "";
};
