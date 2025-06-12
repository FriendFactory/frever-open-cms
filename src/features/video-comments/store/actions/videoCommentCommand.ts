import { defineActionGroup } from "rd-redux-utils";

import { VideoComment } from "../../services";

export const commentCommandActionGroup = defineActionGroup<{
    stage: string;
    comments: VideoComment[];
}>("VIDEO COMMENT COMMAND");

export const executeCommentCommandAction = commentCommandActionGroup.defineAction("EXECUTE");

export const commentCommandFinishedAction = commentCommandActionGroup.defineAction("FINISHED");
