import { ThumbnailFile } from "shared";

export interface ThemeCollection {
    id: number;
    name: string;
    sortOrder: number | null;
    seasonId: number | null;
    isActive: boolean;
    files: ThumbnailFile[];
    readinessId: number;
    hasLargeMarketingThumbnail: boolean;
    wardrobes: WardrobeShortInfo[];
}

export interface ThemeCollectionDto extends Partial<Omit<ThemeCollection, "wardrobes">> {
    wardrobeIds: number[];
}

export interface WardrobeShortInfo {
    id: number;
    name: string;
    files: ThumbnailFile[];
}

export type ThemeCollectionWardrobeAction = "Add" | "Delete";
