import { defineActionGroup } from "rd-redux-utils";

import { ResultWithCount } from "shared";
import { CreatorWelcomeMessagesQueryParams, StarCreatorWelcomeMessage } from "../../services";

export const creatorMessagesListActionGroup = defineActionGroup<{
    stage: string;
    params: CreatorWelcomeMessagesQueryParams;
}>("STAR CREATOR WELCOME MESSAGES LIST");

export const creatorMessagesListLoadingAction = creatorMessagesListActionGroup.defineAction("LOADING");

export const creatorMessagesListLoadedOkAction = creatorMessagesListActionGroup.defineAction<{
    result: ResultWithCount<StarCreatorWelcomeMessage>;
}>("LOADED OK");

export const creatorMessagesListLoadedErrorAction = creatorMessagesListActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

export const creatorMessageUpsertActionGroup =
    defineActionGroup<{ stage: string; data: StarCreatorWelcomeMessage }>("STAR CREATOR MESSAGE UPSERT");

export const creatorMessageUpsertAction = creatorMessageUpsertActionGroup.defineAction("EXECUTE");

export const creatorMessageUpsertFinishedAction = creatorMessageUpsertActionGroup.defineAction("FINISHED");
