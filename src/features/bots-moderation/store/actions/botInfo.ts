import { defineAction, defineActionGroup } from "rd-redux-utils";

import { Bot } from "../../services";
import { NormalizedBot } from "../reducer/bot";

export const botInfoActionGroup = defineActionGroup<{ stage: string; id: number }>("BOT INFO");

export const botInfoLoadingAction = botInfoActionGroup.defineAction("LOADING");

export const botInfoLoadedOkAction = botInfoActionGroup.defineAction<{ result: Bot }>("LOADED OK");

export const botInfoLoadedErrorAction = botInfoActionGroup.defineAction<{ error: string }>("LOADED ERROR");

export const upsertBotAction = defineAction<{ stage: string; data: Bot | NormalizedBot }>("UPSERT BOT");

export const updateBotCommentsAction =
    defineAction<{ stage: string; botId: number; comments: number[] }>("UPDATE BOT COMMENTS");

export const deleteBotAction = defineAction<{ stage: string; botId: number }>("DELETE BOT");
