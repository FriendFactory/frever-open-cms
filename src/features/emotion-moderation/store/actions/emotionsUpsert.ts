import { Emotion } from "features/emotion-moderation/services";
import { defineAction } from "rd-redux-utils";

export const upsertEmotionsAction = defineAction<{ stage: string; data: Partial<Emotion> }>("UPDATE EMOTION");

export const upsertEmotionsOkAction = defineAction<{ stage: string; data: Emotion[] }>("UPDATE EMOTION OK");
