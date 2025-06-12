import { defineActionGroup } from "rd-redux-utils";

import { GetCharacterListParams } from "features/search-characters/services";
import { Character } from "features/user-moderation/services";

export const characterListActionGroup =
    defineActionGroup<{ stage: string; params: GetCharacterListParams }>("CHARACTER LIST");

export const characterListLoadAction = characterListActionGroup.defineAction("LOAD");

export const characterListLoadingAction = characterListActionGroup.defineAction("LOADING");

export const characterListLoadedOkAction = characterListActionGroup.defineAction<{
    result: Character[];
}>("RESPONSE OK");

export const characterListLoadedErrorAction =
    characterListActionGroup.defineAction<{ error: string }>("RESPONSE ERROR");
