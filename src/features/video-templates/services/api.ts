import { ThumbnailFile } from "shared";

export type SortOrderTypes =
    | "trendingSortingOrder"
    | "categorySortingOrder"
    | "onBoardingSortingOrder"
    | "challengeSortOrder";

export interface Template {
    onBoardingSortingOrder: number | null;
    description?: string;
    usageCount: number;
    creatorName: string;
    artistName: string;
    id: number;
    templateSubCategoryId: number;
    title: string;
    creatorId: number;
    eventId: number;
    topListPositionInDiscovery: number;
    trendingSortingOrder: number | null;
    promotionalSortingOrder: number | null;
    categorySortingOrder: number | null;
    subCategorySortingOrder: number | null;
    characterCount: number;
    songName: string | null;
    isDeleted: boolean;
    isDefault: boolean;
    reverseThumbnail: boolean;
    readinessId: number;
    readiness: string | null;
    tags: number[];
    createdTime: string;
    modifiedTime: string;
    files: any;
    videoClipStartTimeMs: string | null;
    videoClipEndTimeMs: string | null;
    challengeSortOrder: number | null;
    useLevelVideo?: boolean;
}

export interface TemplateEventMusicController {
    userSound?: { id: number; files: ThumbnailFile[] };
    song?: { id: number; files: ThumbnailFile[] };
}
