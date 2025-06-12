import { defineActionGroup } from "rd-redux-utils";

import { LootBox, LootBoxQueryParams } from "../../services";
import { ResultWithCount } from "shared";

export const lootBoxListActionGroup = defineActionGroup<{ stage: string; params: LootBoxQueryParams }>("LOOT BOX LIST");

export const lootBoxListLoadAction = lootBoxListActionGroup.defineAction("LOAD");

export const lootBoxListLoadingAction = lootBoxListActionGroup.defineAction("LOADING");

export const lootBoxListLoadedOkAction =
    lootBoxListActionGroup.defineAction<{ result: ResultWithCount<LootBox> }>("LOADED OK");

export const lootBoxListLoadedErrorAction = lootBoxListActionGroup.defineAction<{ error: string }>("LOADED ERROR");

export const DEFAULT_LOOT_BOX_PAGE_SIZE = 50;
