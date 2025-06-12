import { defineActionGroup } from "rd-redux-utils";

import { InboxInfo } from "features/community-moderation/services/api";
import { InboxListQueryParams } from "features/community-moderation/services/getInboxList";

export const inboxListActionGroup = defineActionGroup<{ stage: string; params: InboxListQueryParams }>("INBOX LIST");

export const inboxListLoadingAction = inboxListActionGroup.defineAction("LOADING");

export const inboxListLoadedOkAction = inboxListActionGroup.defineAction<{ data: InboxInfo[] }>("LOADED OK");

export const inboxListLoadedErrorAction = inboxListActionGroup.defineAction<{ error: string }>("LOADED ERROR");

export const inboxListLoadAction = inboxListActionGroup.defineAction("LOAD");
