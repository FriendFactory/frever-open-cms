import { defineAction } from "rd-redux-utils";
import { Store } from "antd/lib/form/interface";

import { Hashtag } from "features/hashtag-moderation/services";

export const updateHashtagAction = defineAction<{ stage: string; id: number; data: Store }>("UPDATE HASHTAG");

export const updateHashtagOkAction = defineAction<{ stage: string; result: Hashtag }>("UPDATE HASHTAG RESPONSE OK");

export const deleteHashtagAction = defineAction<{ stage: string; id: number }>("REMOVE HASHTAG");

export const updateSortOrderAction = defineAction<{ stage: string; data: Hashtag[] }>("UPDATE HASHTAG SORTING ORDER");

export const updateSortOrderOkAction = defineAction<{ stage: string; result: Hashtag[] }>(
    "UPDATE HASHTAG SORTING ORDER RESPONSE OK"
);
