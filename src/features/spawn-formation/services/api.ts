import { ThumbnailFile } from "shared";

export interface CharacterSpawnPositionFormation {
    id: number;
    name: string;
    characterCount: number;
    sortOrder: number;
    characterSpawnPositionFormationTypeId: number;
    supportsMultiCharacterAnimation: boolean;
    applyOnCharacterEditing: boolean;
    files: ThumbnailFile[];
}
