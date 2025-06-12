import { Action } from "redux";

import { BotComment } from "features/bots-moderation/services";
import { botCommentListLoadedOkAction, botInfoLoadedOkAction, updateBotCommentAction } from "../../actions";

export type BotCommentEntitiesState = Record<string, BotComment | undefined>;

export const botCommentEntitiesReducer = (
    state: BotCommentEntitiesState | undefined,
    action: Action
): BotCommentEntitiesState => {
    if (!state) state = {};

    if (botInfoLoadedOkAction.is(action)) {
        return {
            ...state,
            ...action.result.comments?.reduce<BotCommentEntitiesState>((acc, el) => {
                acc[botCommentKeySelector(action.stage, el.id)] = el;
                return acc;
            }, {})
        };
    }

    if (updateBotCommentAction.is(action)) {
        state = {
            ...state,
            [botCommentKeySelector(action.stage, action.result.id)]: action.result
        };
    }

    if (botCommentListLoadedOkAction.is(action)) {
        return {
            ...state,
            ...action.result.data.reduce<BotCommentEntitiesState>((acc, el) => {
                acc[botCommentKeySelector(action.stage, el.id)] = el;
                return acc;
            }, {})
        };
    }

    return state;
};

export const botCommentKeySelector = (stage: string, id: number) => `${stage}/bot-comment/${id}`;
