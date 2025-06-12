import { defineAction } from "rd-redux-utils";
import { Actions } from "shared/services/executeVideosDelete";

export const userSoundDeleteAssociatedVideos = defineAction<{
    stage: string;
    id: number;
    selectBy: "userSoundId";
    command: Actions;
}>("USER SOUND: DELETE ASSOCIATED VIDEOS");
