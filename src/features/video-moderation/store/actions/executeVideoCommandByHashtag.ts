import { defineAction } from "rd-redux-utils";

import { VideosCommandByHashtag } from "features/video-moderation/services";

export const executeVideoCommandByHashtagAction = defineAction<{
    stage: string;
    command: VideosCommandByHashtag;
    body: { HashtagId: number; IncludeRemixes: boolean };
}>("EXECUTE VIDEO COMMAND BY HASHTAG");
