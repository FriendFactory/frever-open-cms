import { defineActionGroup } from "rd-redux-utils";

import { ResultWithCount } from "shared";
import { GetHashtagListParams } from "features/hashtag-moderation/services/getHashtagList";
import { Hashtag } from "features/hashtag-moderation/services/api";

export interface HashtagListParams {
    stage: string;
    params: GetHashtagListParams;
}

export const hashtagListActionGroup = defineActionGroup<HashtagListParams>("HASHTAG LIST");

export const hashtagListLoadingAction = hashtagListActionGroup.defineAction("LOADING");

export const hashtagListLoadAction = hashtagListActionGroup.defineAction("LOAD");

export const hashtagListLoadedOkAction = hashtagListActionGroup.defineAction<{
    result: ResultWithCount<Hashtag>;
}>("RESPONSE OK");

export const hashtagListLoadedErrorAction = hashtagListActionGroup.defineAction<{ error: string }>("RESPONSE ERROR");
