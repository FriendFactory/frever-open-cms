import { ThumbnailFile } from "shared";

export interface Universe {
    id: number;
    name: string;
    readinessId: number;
    isNew: boolean;
    files: ThumbnailFile[];
    sortOrder: number;
    allowStartGift: boolean;
}

export interface UniverseFull {
    id: number;
    name: string;
    readinessId: number;
    races: UniverseAndRace[];
    files: ThumbnailFile[];
    sortOrder: number;
    allowStartGift: number;
}

export interface UniverseAndRace {
    raceId: number;
    readinessId: number;
    UniverseAndRaceSettings: UniverseAndRaceSettings;
}

export interface UniverseAndRaceSettings {
    canUseCharacters: boolean;
    canRemixVideos: boolean;
}
