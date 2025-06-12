import {
    BOT_MESSAGE_TYPE_ID,
    ChatInfo,
    GroupShortInfo,
    MEMBER_MESSAGE_TYPE_ID,
    SYSTEM_MESSAGE_TYPE_ID
} from "features/chats-moderation/services";
import { ThumbnailFile } from "shared";

export interface InboxInfo extends ChatInfo {
    lastReadMessageId: number | null;
    totalUnreadMessages: number;
}

interface SourceChatMessage {
    id: number;
    text: string;
    videoId: null | number;
    likeCount: number;
    time: string;
    isHidden: boolean;
    isDeleted: boolean;
    mentions: GroupShortInfo[];
    files: ThumbnailFile[] | null;
    replyToMessage: ChatConversationMessage | null;
}

interface SystemChatMessage extends SourceChatMessage {
    groupId: null;
    group: null;
    messageTypeId: typeof SYSTEM_MESSAGE_TYPE_ID | typeof BOT_MESSAGE_TYPE_ID;
}

interface MemberChatMessage extends SourceChatMessage {
    group: GroupShortInfo;
    messageTypeId: typeof MEMBER_MESSAGE_TYPE_ID;
}

export type ChatConversationMessage = (SystemChatMessage | MemberChatMessage) & {
    isLikedByCurrentUser: boolean;
    chatId: number;
};

export enum ChatUnreadMessageFilter {
    Any,
    Text,
    File,
    Video
}

export interface ScheduledMessage {
    id: number;
    senderGroupId: number;
    text: string;
    videoId: number | null;
    files: ThumbnailFile[] | null;
    scheduledForTime?: string;
    groupIds: number[] | null;
    countryIds: number[];
    registrationAfterDate?: string;
    registrationBeforeDate?: string;
    lastLoginAfterDate?: string;
    lastLoginBeforeDate?: string;

    status: ScheduledMessageStatus;
}

export const scheduledMessageStatuses = [
    "scheduled",
    "pending",
    "canceled",
    "completed",
    "completed_with_errors"
] as const;

export type ScheduledMessageStatus = typeof scheduledMessageStatuses[number];
