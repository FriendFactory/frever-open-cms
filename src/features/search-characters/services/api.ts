import { ThumbnailFile } from "shared";

export interface CharacterBakedView {
    id: number;
    characterId: number;
    outfitId: number | null;
    readinessId: number;
    heelsHeight: number;
    createdTime: string;
    modifiedTime: string;
    isValid: boolean;
    characterVersion: string;
    readiness: null;
    files: ThumbnailFile[];
}
