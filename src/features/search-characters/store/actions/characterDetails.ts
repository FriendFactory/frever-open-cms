import { defineAction, defineActionGroup } from "rd-redux-utils";

import { Character } from "features/user-moderation/services";
import { EditCharacterFormData } from "features/search-characters/services";

export const characterDetailsActionGroup = defineActionGroup<{ stage: string; id: number }>("CHARACTER DETAILS");

export const characterDetailsLoadingAction = characterDetailsActionGroup.defineAction("LOADING");

export const characterDetailsLoadedOkAction = characterDetailsActionGroup.defineAction<{
    result: Character;
}>("LOADED OK");

export const characterDetailsLoadedErrorAction = characterDetailsActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

export const updateCharacterAction = defineAction<{ stage: string; data: EditCharacterFormData }>("UPDATE CHARACTER");

export const updateCharaThumbAction = defineAction<{
    stage: string;
    data: { id: number; resolution: string; extension: number };
    file: File;
}>("UPDATE CHARACTER THUMBNAIL");

export const updateUmaRecipeAction = defineAction<{
    stage: string;
    data: { id: number; j?: string; umaRecipeAndWardrobe?: { wardrobeId: number }[] };
}>("UPDATE UMA RECIPE");
