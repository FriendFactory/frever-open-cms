import { Group } from "features/user-moderation/services";
import { MusicController } from "features/level-moderation/services";

export type UserMediaFileType = "Photo" | "VideoClip" | "UserSound";

export interface UserMediaFileEntities {
    Photo: Photo;
    VideoClip: VideoClip;
    UserSound: UserSound;
}

export type UserMediaFileEntity<T extends UserMediaFileType = UserMediaFileType> = UserMediaFileEntities[T];

export interface UserMediaFile {
    source: null;
    version: string;
    file: number;
    extension: number;
    resolution: null;
    platform: null;
}

export interface Photo {
    files: UserMediaFile[];
    createdTime: string;
    modifiedTime: string;
    id: number;
    groupId: number;
    resolutionHeight: number;
    resolutionWidth: number;
    readinessId: number;
    uploaderUserId: number;
    sortOrder: number;
    size: number | null;
    tags: null;
    assetStoreInfo: null;
    group: null;
    readiness: null;
    uploaderUser: null;
    setLocationController: [];
}

export interface VideoClip {
    files: UserMediaFile[];
    id: number;
    groupId: number;
    createdTime: string;
    modifiedTime: string;
    size: number | null;
    duration: number | null;
    frameRate: number | null;
    resolutionHeight: number;
    resolutionWidth: number;
    readinessId: number;
    sortOrder: number;
    uploaderUserId: number;
    tags: null;
    assetStoreInfo: null;
    group: null;
    readiness: null;
    uploaderUser: null;
    setLocationController: [];
}

export interface UserSound {
    files: UserMediaFile[];
    createdTime: string;
    deletedAt: string | null;
    id: number;
    groupId: number;
    size: number;
    duration: number;
    group: Group | null;
    musicController: MusicController[];
}

export interface CdnLink {
    ok: boolean;
    link: string;
}
