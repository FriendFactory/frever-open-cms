import { defineAction, defineActionGroup } from "rd-redux-utils";

import { GetReplicateResponseWithParams } from "features/vme-backgrounds/services";
import { ReplicateInputType } from "features/vme-backgrounds/helpers";

export const backgroundAIPreviewActionGroup = defineActionGroup<{ stage: string }>("AI BACKGROUND PREVIEW");

export const runBackgroundAIPreviewAction =
    backgroundAIPreviewActionGroup.defineAction<{ replicateInput: ReplicateInputType[] }>("RUN");

export const backgroundAIPreviewResponseAction = backgroundAIPreviewActionGroup.defineAction<{
    replicateOutput: GetReplicateResponseWithParams[];
}>("RESPONSE");

export const backgroundAIPreviewErrorAction = backgroundAIPreviewActionGroup.defineAction<{
    error: string;
}>("RESPONSE ERROR");

export const closeBackgroundAIPreviewAction = defineAction("AI BACKGROUND PREVIEW CLOSE");
