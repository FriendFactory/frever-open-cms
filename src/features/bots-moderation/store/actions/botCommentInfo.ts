import { defineAction } from "rd-redux-utils";

import { BotComment } from "features/bots-moderation/services";

export const upsertBotCommentAction = defineAction<{ stage: string; data: BotComment }>("UPSERT BOT COMMENT");

export const updateBotCommentAction = defineAction<{ stage: string; result: BotComment }>("UPDATE BOT COMMENT");

export const deleteBotCommentAction = defineAction<{ stage: string; botCommentId: number }>("DELETE BOT COMMENT");
