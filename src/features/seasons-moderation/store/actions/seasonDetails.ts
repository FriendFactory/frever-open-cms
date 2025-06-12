import { defineAction, defineActionGroup } from "rd-redux-utils";

import { SeasonBaseInfo, SeasonEntity, SeasonEntityName, SeasonInfo } from "features/seasons-moderation/services";
import { CopySeasonType } from "features/seasons-moderation/services/copySeason";

export const seasonDetailsActionGroup = defineActionGroup<{ stage: string; id: number }>("SEASON DETAILS");

export const seasonDetailsLoadingAction = seasonDetailsActionGroup.defineAction("LOADING");

export const seasonDetailsLoadedOkAction = seasonDetailsActionGroup.defineAction<{ result: SeasonInfo }>("RESPONSE OK");

export const seasonDetailsLoadedErrorAction =
    seasonDetailsActionGroup.defineAction<{ error: string }>("RESPONSE ERROR");

export const postSeasonAction = defineAction<{ stage: string; data: SeasonBaseInfo }>("POST SEASON");

export const postSeasonEntityAction =
    defineAction<{ stage: string; entityName: SeasonEntityName; data: SeasonEntity; thumbnail?: File }>(
        "POST SEASON ENTITY"
    );

export const deleteSeasonEntityAction =
    defineAction<{ stage: string; entityName: SeasonEntityName; entity: SeasonEntity }>("DELETE SEASON ENTITY");

export const copySeasonEntityAction = defineAction<{ stage: string; data: CopySeasonType }>("COPY SEASON ENTITY");
