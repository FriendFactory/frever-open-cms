import { BASE_PAGE_URL } from "urls";
import { ReportedMessageListParams } from "features/reported-messages/services";

export const REPORTED_CHAT_MESSAGE_BASE_URL = BASE_PAGE_URL.createChildPath("reported-chat-message");

export const REPORTED_CHAT_MESSAGE_LIST_URL = REPORTED_CHAT_MESSAGE_BASE_URL.createChildPath<
    {},
    ReportedMessageListParams
>("list");

export const DEFAULT_REPORTED_CHAT_MESSAGE_PAGE_SIZE = 100;
