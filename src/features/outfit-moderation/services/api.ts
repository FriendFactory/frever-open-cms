import { WardrobeAsset } from "features/search-assets/services";
import { ThumbnailFile } from "shared";

export interface Outfit {
    id: number;
    groupId: number;
    readinessId?: number;
    tags: number[];
    outfitAndWardrobe: { outfitId: number; wardrobeId: number; wardrobe?: WardrobeAsset | null }[];
    createdTime?: string;
    sortOrder: number;
    files: ThumbnailFile[];
    modifiedTime: string;
    name: string | null;
    isDeleted: boolean;
    saveMethod: number;
    character: unknown[];
    characterController: unknown[];
    outfitAndUmaSharedColor: unknown[];
}
