import { ThumbnailFile } from "shared";

export const MEMBER_MESSAGE_TYPE_ID = 1 as const;
export const SYSTEM_MESSAGE_TYPE_ID = 2 as const;
export const BOT_MESSAGE_TYPE_ID = 3 as const;

export const PRIVATE_CHAT_TYPE_ID = 1 as const;
export const CREW_CHAT_TYPE_ID = 2 as const;
export const GROUP_CHAT_TYPE_ID = 3 as const;

export enum RewardAssetType {
    Wardrobe,
    SetLocation,
    CameraFilter,
    Vfx,
    VoiceFilter,
    BodyAnimation
}

export interface CrewRewards {
    id: number;

    requiredTrophyScore: number;
    title: string | null;
    lootBoxId: number | null;
    isEnabled: boolean;

    hardCurrency: number | null;
    softCurrency: number | null;

    assetId: number | null;
    assetType: number | null;
    files: ThumbnailFile[];
}

export interface Crew {
    id: number;
    chatId: number;
    name: string;
    description: string;
    isDeleted: boolean;
    isPublic: boolean;
    files: ThumbnailFile[];
    members: CrewMember[];
    languageId: number | null;
    trophyScore: number;
}

export interface CrewMember {
    groupId: number;
    nickname: string;
    role: string;
    mainCharacterId: number;
    mainCharacterFiles: ThumbnailFile[];
}
