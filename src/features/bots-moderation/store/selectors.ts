import { AppState } from "app-state";
import { BotComment } from "../services";
import { NormalizedBot, botKeySelector } from "./reducer/bot";
import { botCommentKeySelector } from "./reducer/comment/botCommentEntitiesReducer";

export const botCommentListByBotId =
    (stage: string, id: number) =>
    (appState: AppState): { loading: boolean; data?: BotComment[]; bot?: NormalizedBot } => {
        const detailsPage = appState.bots.infoPage[botKeySelector(stage, id)];
        const bot = appState.bots.entities?.[botKeySelector(stage, id)];

        const data = bot?.comments
            ?.map((el) => appState.botComments.entities[botCommentKeySelector(stage, el)]!)
            .filter(Boolean);

        return {
            loading: detailsPage?.loading ?? false,
            data,
            bot
        };
    };
