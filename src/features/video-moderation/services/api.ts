import { Hashtag } from "features/hashtag-moderation/services";

export interface Video {
    id: number;
    access: number;
    allowComment: boolean;
    allowRemix: boolean;
    levelId: number | null;
    groupId: number;
    size: number;
    duration: number;
    createdTime: string;
    kpi?: {
        videoId: number;
        likes: number;
        views: number;
        comments: number;
        shares: number;
        remixes: number;
        battlesWon: number;
        battlesLost: number;
    };
    songName: string | null;
    deletedByGroupId?: number;
    artistName: string | null;
    charactersCount: number;
    groupNickName: string | null;
    remixedFromVideoId: number | null | undefined;
    originalCreatorGroupNickName?: string;
    likedByCurrentUser: boolean;
    toplistPosition: number | null;
    isDeleted: boolean;
    isPublic: boolean;
    externalSongIds: number[] | null;
    publishTypeId: PublishType;
    levelTypeId: LevelType;
    version: string;
    taggedGroups: Array<{ groupId: number; groupNickName: string }>;
    thumbnailUrl: string;
    hashtags: Hashtag[];
    mentions: { groupId: number; groupNickname: string }[];
    description: string | null;
    schoolTaskId?: number | null;
    startListItem: number | null;
    language: string | null;
    country: string | null;
    songs: SongInfo[];
    userSounds: UserSoundInfo[];
}

export interface SongInfo {
    id: number;
    artist: string;
    title: string;
    isExternal: boolean;
    isrc: string;
}

export interface UserSoundInfo {
    id: number;
    name: string;
    eventId: number;
}

export enum PublishType {
    FeedVideo = 1,
    ChatVideo = 2
}

export enum LevelType {
    Studio = 1,
    Moments = 2
}

export interface VideoMediaInfo {
    id: number;
    levelId: number;
    groupId: number;
    redirectUrl: string;
    sharingUrl: string;
    playerUrl: string;
    thumbnailUrl: string;
    singleFileVideoUrl: string;
    signedCookie: { "CloudFront-Policy": string; "CloudFront-Signature": string; "CloudFront-Key-Pair-Id": string };
}
