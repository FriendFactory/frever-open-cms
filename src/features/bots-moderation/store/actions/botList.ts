import { defineActionGroup } from "rd-redux-utils";

import { Bot, BotListQueryParams } from "../../services";
import { ResultWithCount } from "shared";

export const botListActionGroup = defineActionGroup<{ stage: string; params: BotListQueryParams }>("BOT LIST");

export const botListLoadingAction = botListActionGroup.defineAction("LOADING");

export const botListLoadedOkAction = botListActionGroup.defineAction<{ result: ResultWithCount<Bot> }>("LOADED OK");

export const botListLoadedErrorAction = botListActionGroup.defineAction<{ error: string }>("LOADED ERROR");
