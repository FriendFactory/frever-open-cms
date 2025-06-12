import { ThumbnailFile } from "shared";
import { QuestGroupListQueryParams } from "./getQuestGroupList";
import { QuestListQueryParams } from "./getQuestList";
import { RewardListQueryParams } from "./getRewardList";

export interface OnboardingQuestGroup {
    id: number;
    key: string;
    title: LocalizationType;
    description: LocalizationType;
    ordinal: number;
    isEnabled: boolean;
    files: ThumbnailFile[] | null;
}

export interface OnboardingQuest {
    id: number;
    key: string;
    title: LocalizationType;
    description: LocalizationType;
    onboardingQuestGroupId: number;
    ordinal: number;
    isEnabled: boolean;
    questType: string;
    questParameter?: number;
}

export interface OnboardingReward {
    id: number;
    onboardingQuestGroupId: number;
    assetId: number | null;
    assetType: number | null;
    softCurrency: number | null;
    hardCurrency: number | null;
    xp: number | null;
    title: string;
    isEnabled: boolean;
    files: ThumbnailFile[] | null;
}

export interface OnboardingData {
    reward: { data: OnboardingReward; queryParams: RewardListQueryParams };
    quest: { data: OnboardingQuest; queryParams: QuestListQueryParams };
    questGroup: {
        data: OnboardingQuestGroup;
        queryParams: QuestGroupListQueryParams;
    };
}

export type OnboardingDataNames = keyof OnboardingData;

export type ISOCodes = keyof typeof AVAILABLE_LANGUAGES;

export type LocalizationImportType = "AddNew" | "Merge" | "Replace";

export type LocalizationType = {
    eng: string;
} & Partial<{
    [key in ISOCodes]: string | null;
}>;

export const LOCALIZATION_FIELDS = ["title", "description"] as const;

export const AVAILABLE_LANGUAGES = {
    eng: "English",
    spa: "Spanish",
    deu: "German",
    fra: "French",
    por: "Portuguese"
} as const;
