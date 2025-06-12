import { ThumbnailFile } from "shared";

export interface PromotedSong {
    id: number;
    songId: number | null;
    externalSongId: number | null;
    sortOrder: number;
    isEnabled: boolean;
    files: ThumbnailFile[];
    availableForCountries: string[];
}

export type PromotedSongType = "song" | "externalSong";

export type SongEntity = {
    id: number;
    name: string;
};

export type ExternalSongEntity = {
    id: number;
    songName: string;
};

export type PromotedSongNameEntity<T extends PromotedSongType> = T extends "song" ? SongEntity : ExternalSongEntity;
