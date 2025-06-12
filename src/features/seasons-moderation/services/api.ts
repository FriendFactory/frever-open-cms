import { ThumbnailFile } from "shared";

export enum RewardAssetType {
    Wardrobe,
    SetLocation,
    CameraFilter,
    Vfx,
    VoiceFilter,
    BodyAnimation
}

export type SeasonEntityName = "quests" | "rewards" | "screenshots";

export enum SeasonEntityPathToFieldName {
    "quests" = "season/quest",
    "rewards" = "season/reward",
    "screenshots" = "season/marketing-screenshot"
}

export type Season = Partial<SeasonInfo> & SeasonBaseInfo;

export interface SeasonBaseInfo {
    id: number;
    title: string;
    description: string | null;
    startDate: string;
    endDate: string;
}

export type SeasonEntity<T extends SeasonEntityName = SeasonEntityName> = SeasonInfo[T][number];

export interface SeasonInfo extends SeasonBaseInfo {
    levels: SeasonLevel[];
    quests: SeasonQuest[];
    rewards: SeasonReward[];
    screenshots: SeasonScreenshot[];
}

export interface SeasonLevel {
    id: number;
    level: number;
    name: string;
    xpRequired: number;
}

export interface SeasonQuest {
    id: number;
    seasonId: number;
    type: string;
    title: string;
    value: number;
}

export interface SeasonReward {
    id: number;
    seasonId: number;
    level: number;
    seasonQuestId: null;
    isPremium: boolean;
    isEnabled: boolean;
    assetId: number | null;
    assetType: number | null;
    softCurrency: number | null;
    hardCurrency: number | null;
    xp: number | null;
    files: ThumbnailFile[];
}

export interface SeasonScreenshot {
    id: number;
    seasonId: number;
    ordinal: number;
    files: ThumbnailFile[];
}
