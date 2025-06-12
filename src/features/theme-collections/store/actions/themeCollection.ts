import { defineAction } from "rd-redux-utils";

import { ThemeCollection, ThemeCollectionWardrobeAction } from "features/theme-collections/services";

export interface ThemeCollectionWithImages {
    item: Partial<ThemeCollection>;
    newImages?: { file: number; extension: number; resolution: string; newFile: File }[];
}

export const upsertCollectionsAction =
    defineAction<{ stage: string; items: ThemeCollection[] }>("UPDATE THEME COLLECTIONS");

export const upsertSingleCollectionAction = defineAction<{ stage: string; data: ThemeCollectionWithImages }>(
    "UPDATE SINGLE THEME COLLECTION"
);

export const updateThemeCollectionWardrobesAction = defineAction<{
    stage: string;
    item: ThemeCollection;
    targetWardrobeIds: number[];
    action: ThemeCollectionWardrobeAction;
}>("UPDATE THEME COLLECTION WARDROBES");

export const upsertCollectionsOkAction =
    defineAction<{ stage: string; data: ThemeCollection[] }>("UPDATE THEME COLLECTIONS OK");
