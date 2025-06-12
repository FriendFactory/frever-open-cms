import { defineAction } from "rd-redux-utils";

import { Universe } from "features/universe-moderation/services";

export interface UniverseWithImages {
    item: Partial<Universe>;
    newImages?: { file: number; extension: number; resolution: string; newFile: File }[];
}

export const upsertUniversesAction = defineAction<{ stage: string; items: Universe[] }>("UPDATE UNIVERSES");

export const upsertSingleUniverseAction =
    defineAction<{ stage: string; data: UniverseWithImages }>("UPDATE SINGLE UNIVERSE");

export const upsertUniversesOkAction = defineAction<{ stage: string; data: Universe[] }>("UPDATE UNIVERSES OK");
