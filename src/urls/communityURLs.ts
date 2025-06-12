import { InboxListQueryParams } from "features/community-moderation/services/getInboxList";
import { ScheduledMessageQueryParams } from "features/community-moderation/services/scheduledMessage/getScheduledMessage";
import { BASE_PAGE_URL } from "urls";

export const COMMUNITY_BASE_URL = BASE_PAGE_URL.createChildPath("community");

export const COMMUNITY_CHAT_URL = COMMUNITY_BASE_URL.createChildPath<{}, InboxListQueryParams>("chat");

export const MASS_SEND_OUTS_BASE_URL = BASE_PAGE_URL.createChildPath("mass-send-outs");
export const MASS_SEND_OUTS_LIST_PAGE_URL = MASS_SEND_OUTS_BASE_URL.createChildPath<{}, ScheduledMessageQueryParams>(
    "list"
);
export const MASS_SEND_OUTS_DETAILS_PAGE_URL = MASS_SEND_OUTS_BASE_URL.createChildPath<{ id: number }, {}>(
    "details/:id"
);

export const COMMUNITY_INBOX_CHAT_LIST_SIZE = 25;
export const COMMUNITY_CONVERSATION_CHAT_LIST_SIZE = 100;

export const SCHEDULED_MESSAGE_LIST_SIZE = 50;
