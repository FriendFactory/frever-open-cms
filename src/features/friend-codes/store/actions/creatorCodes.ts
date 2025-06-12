import { defineAction, defineActionGroup } from "rd-redux-utils";

import { ResultWithCount } from "shared";
import { CreatorCodesQueryParams, StarCreatorCode } from "../../services";

export const creatorCodesListActionGroup =
    defineActionGroup<{ stage: string; params: CreatorCodesQueryParams }>("STAR CREATOR CODES LIST");

export const creatorCodesListLoadingAction = creatorCodesListActionGroup.defineAction("LOADING");

export const creatorCodesListLoadedOkAction = creatorCodesListActionGroup.defineAction<{
    result: ResultWithCount<StarCreatorCode>;
}>("LOADED OK");

export const creatorCodesListLoadedErrorAction = creatorCodesListActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

export const creatorCodeUpsertActionGroup =
    defineActionGroup<{ stage: string; data: StarCreatorCode }>("STAR CREATOR CODE UPSERT");

export const creatorCodeUpsertAction = creatorCodeUpsertActionGroup.defineAction("EXECUTE");

export const creatorCodeUpsertFinishedAction = creatorCodeUpsertActionGroup.defineAction("FINISHED");

export const changeCreatorCodeStatusAction = defineAction<{ stage: string; data: StarCreatorCode }>(
    "CHANGE STAR CREATOR CODE STATUS"
);
