import { defineAction } from "rd-redux-utils";

export const resetCacheAction = defineAction<{ assetStageId: string }>("RESET CACHE");
