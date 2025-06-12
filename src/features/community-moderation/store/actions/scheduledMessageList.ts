import { defineAction, defineActionGroup } from "rd-redux-utils";

import { ScheduledMessage } from "features/community-moderation/services/api";
import { ScheduledMessageQueryParams } from "features/community-moderation/services/scheduledMessage/getScheduledMessage";

export const scheduledMessageListActionGroup =
    defineActionGroup<{ stage: string; params: ScheduledMessageQueryParams }>("SCHEDULED MESSAGE LIST");

export const scheduledMessageListLoadingAction = scheduledMessageListActionGroup.defineAction("LOADING");

export const scheduledMessageListLoadedOkAction =
    scheduledMessageListActionGroup.defineAction<{ data: ScheduledMessage[]; total?: number }>("LOADED OK");

export const scheduledMessageListLoadedErrorAction =
    scheduledMessageListActionGroup.defineAction<{ error: string }>("LOADED ERROR");

export const upsertScheduledMessageAction =
    defineAction<{ stage: string; data: Partial<ScheduledMessage>; file?: File }>("UPDATE SCHEDULED MESSAGE");

export const upsertScheduledMessageOkAction =
    defineAction<{ stage: string; data: ScheduledMessage[] }>("UPDATE SCHEDULED MESSAGE OK");

export const deleteScheduledMessageAction = defineAction<{ stage: string; id: number }>("DELETE SCHEDULED MESSAGE");
