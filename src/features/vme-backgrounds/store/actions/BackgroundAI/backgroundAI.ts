import { defineAction } from "rd-redux-utils";

import { BackgroundAI } from "features/vme-backgrounds/services";

export interface BackgroundAIWithImages {
    item: Partial<BackgroundAI>;
    newImages?: { file: number; extension: number; resolution: string; newFile: File }[];
}

export const upsertBackgroundAIAction =
    defineAction<{ stage: string; items: BackgroundAI[] }>("UPDATE VME BACKGROUND AI");

export const upsertSingleBackgroundAIAction = defineAction<{ stage: string; data: BackgroundAIWithImages }>(
    "UPDATE SINGLE VME BACKGROUND AI"
);

export const upsertBackgroundAIOkAction =
    defineAction<{ stage: string; data: BackgroundAI[] }>("UPDATE VME BACKGROUND AI OK");

export const deleteBackgroundAIAction = defineAction<{ stage: string; data: BackgroundAI }>("DELETE VME BACKGROUND AI");
