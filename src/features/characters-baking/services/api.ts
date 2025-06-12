import { ThumbnailFile } from "shared";

export interface CharacterBakedViewStatistics {
    averageSecondsToBake: number;
    minSecondsToBake: number;
    maxSecondsToBake: number;
    invalidWardrobeCount: number;
    allRequestCount: number;
    successRequestCount: number;
    failedRequestCount: number;
    wrongVersionErrorRequestCount: number;
    bakeableCharactersCount: number;
    nonBakeableCharactersCount: number;
    nonBakeableWardrobes: NonBakeableWardrobe[];

    bakingMachineAgentNames: string[];
}

export interface NonBakeableWardrobe {
    id: number;
    name: string;
    files: ThumbnailFile[];
    usedByCharacterCount: number;
    usagePercentage: number;
}
