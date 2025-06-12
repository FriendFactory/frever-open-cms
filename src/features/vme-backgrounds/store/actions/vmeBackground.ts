import { defineAction } from "rd-redux-utils";

import { VMEBackground } from "features/vme-backgrounds/services";

export interface VMEBackgroundWithImages {
    item: Partial<VMEBackground>;
    newImages?: { file: number; extension: number; resolution: string; newFile: File }[];
}

export const upsertVMEBackgroundAction =
    defineAction<{ stage: string; items: VMEBackground[] }>("UPDATE VME BACKGROUND");

export const upsertSingleVMEBackgroundAction =
    defineAction<{ stage: string; data: VMEBackgroundWithImages }>("UPDATE SINGLE VME BACKGROUND");

export const upsertVMEBackgroundOkAction =
    defineAction<{ stage: string; data: VMEBackground[] }>("UPDATE VME BACKGROUND OK");

export const deleteVMEBackgroundAction = defineAction<{ stage: string; data: VMEBackground }>("DELETE VME BACKGROUND");
