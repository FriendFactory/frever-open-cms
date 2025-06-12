import { LevelEvent } from "./event-api";

export interface Level {
    id: number;
    groupId: number;
    originalGroupId: number;
    createdTime: string;
    modifiedTime: string;
    levelTemplateId: number;
    verticalCategoryId: number;
    languageId: number;
    remixedFromLevelId?: number;
    isDeleted: boolean;
    isDraft: boolean;
    isConverting: boolean;
    event: Array<LevelEvent>;
    containsCopyrightedContent: boolean;

    // A field that must be loaded manually. This is needed for the Level detail page
    videoId?: number;
}
