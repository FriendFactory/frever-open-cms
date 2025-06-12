import { Action } from "redux";

import { botInfoLoadedOkAction, botListLoadedOkAction } from "../../actions";
import { Bot } from "features/bots-moderation/services";

export type NormalizedBot = Omit<Bot, "comments"> & { comments: number[] | undefined };
export type BotEntitiesState = Record<string, NormalizedBot | undefined>;

export const botEntitiesReducer = (state: BotEntitiesState | undefined, action: Action): BotEntitiesState => {
    if (!state) {
        state = {};
    }

    if (botListLoadedOkAction.is(action)) {
        return { ...state, ...createBotWithKeys(action.result.data, action.stage) };
    }

    if (botInfoLoadedOkAction.is(action)) {
        const entityKey = botKeySelector(action.stage, action.result.id);
        return { ...state, [entityKey]: normalizeBot(action.result) };
    }

    return state;
};

const createBotWithKeys = (data: Bot[], stage: string) =>
    data.reduce<BotEntitiesState>((accumulator: BotEntitiesState, item) => {
        accumulator[botKeySelector(stage, item.id)] = normalizeBot(item);
        return accumulator;
    }, {});

export const botKeySelector = (stage: string, id: number) => `${stage}/bot/${id}`;

function normalizeBot(bot: Bot): NormalizedBot {
    const comments = bot.comments?.map((comment) => comment.id);
    return {
        ...bot,
        comments
    };
}
