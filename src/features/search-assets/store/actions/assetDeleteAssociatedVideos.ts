import { defineAction } from "rd-redux-utils";
import { Actions } from "shared/services/executeVideosDelete";

export const assetDeleteAssociatedVideos = defineAction<{
    stage: string;
    id: number;
    selectBy: "songId" | "externalSongId";
    command: Actions;
}>("ASSET: DELETE ASSOCIATED VIDEOS");
