import { defineActionGroup } from "rd-redux-utils";

import { BotComment, BotCommentListQueryParams } from "../../services";
import { ResultWithCount } from "shared";

export const botCommentListActionGroup =
    defineActionGroup<{ stage: string; params: BotCommentListQueryParams }>("BOT COMMENT LIST");

export const botCommentListLoadAction = botCommentListActionGroup.defineAction("LOAD");

export const botCommentListLoadingAction = botCommentListActionGroup.defineAction("LOADING");

export const botCommentListLoadedOkAction =
    botCommentListActionGroup.defineAction<{ result: ResultWithCount<BotComment> }>("LOADED OK");

export const botCommentListLoadedErrorAction =
    botCommentListActionGroup.defineAction<{ error: string }>("LOADED ERROR");
