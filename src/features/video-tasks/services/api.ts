import { Character } from "features/user-moderation/services";
import { CommonExtraDataType, PagesNavigation, ThumbnailFile } from "shared";

export const TaskAssetsTypes = [
    "BodyAnimation",
    "VFX",
    "CameraFilter",
    "VoiceFilter",
    "SetLocation",
    "Wardrobe",
    "Song",
    "ExternalSong"
] as const;

export type TaskAssetTypeName = typeof TaskAssetsTypes[number];

export interface TaskAsset {
    assetId: number;
    assetType: TaskAssetTypeName;
}

export interface TaskCharacterSpawnPositions {
    setLocationId: number;
    characterSpawnPositionId: number;
}

export interface CharacterReplacement {
    originalCharacterId: number;
    replaceCharacterId: number | null;
    replaceWithMainCharacter: boolean;

    originalCharacter?: Character | null;
    replaceCharacter?: Character | null;
}

export interface Task {
    id: number;
    name: string;
    levelId: number | null;
    templateId: number | null;
    eventSequenceNumbers: number[];
    taskType: number;
    editorSettingsId: number;
    xpPayout: number;
    bonusXp: number;
    softCurrencyPayout: number;
    bonusSoftCurrency: number;
    description: string | null;
    sortOrder: number;
    characterCount: number;
    totalVideoCount: number;
    totalTime: number;
    isDressed: boolean;
    deletionAllowed: boolean;
    createdTime: string;
    modifiedTime: string;
    deadline: string;
    publishingTime: string;
    bonusTagId: number | null;
    readinessId: number;
    assets?: TaskAsset[];
    spawnPositions?: TaskCharacterSpawnPositions[];
    tags?: Array<number>;
    readiness: CommonExtraDataType;
    files: Array<ThumbnailFile>;
    pagesNavigation?: PagesNavigation;
    characterReplacement?: CharacterReplacement[];
}

export interface BattleReward {
    id: number;
    schoolTaskId: number;
    place: number;
    softCurrencyPayout: number;
}
