import { BodyAnimationLinkerParams } from "urls";
import { defineAction } from "rd-redux-utils/dist/action-utils/defineAction";

export const bodyAnimationLinkerAction = defineAction<{
    stage: string;
    bodyAnimId: number;
    data: Array<{ characterSpawnPositionId: number }>;
    updateAfter: { type: "lists"; params: BodyAnimationLinkerParams } | { type: "single" };
}>("BODY ANIMATION LINKER");
