import { defineActionGroup } from "rd-redux-utils";

import { CharacterBakedView } from "features/search-characters/services";
import { CharacterBakedViewParams } from "features/search-characters/services/getCharacterBakedView";

export const characterBakedViewActionGroup =
    defineActionGroup<{ stage: string; params: CharacterBakedViewParams }>("CHARACTER BAKED VIEW");

export const characterBakedViewLoadingAction = characterBakedViewActionGroup.defineAction("LOADING");

export const characterBakedViewLoadedOkAction = characterBakedViewActionGroup.defineAction<{
    data: CharacterBakedView[];
}>("LOADED OK");

export const characterBakedViewLoadedErrorAction = characterBakedViewActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");
