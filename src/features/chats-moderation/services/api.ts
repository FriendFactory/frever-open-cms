import { ThumbnailFile } from "shared";

export const MEMBER_MESSAGE_TYPE_ID = 1 as const;
export const SYSTEM_MESSAGE_TYPE_ID = 2 as const;
export const BOT_MESSAGE_TYPE_ID = 3 as const;

export enum ChatTypes {
    Privat = 1,
    Crew = 2,
    Group = 3
}

export interface GroupShortInfo {
    id: number;
    nickname: string;
    mainCharacterId: number;
    mainCharacterFiles: ThumbnailFile[];
}

export interface ChatInfo {
    id: number;
    title: string;
    members: GroupShortInfo[];
    lastMessageTime: string;
    type: number;
    isDeleted: boolean;
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
    replyToMessage: ChatMessage | null;
}

export interface SystemChatMessage extends SourceChatMessage {
    groupId: null;
    group: null;
    messageTypeId: typeof SYSTEM_MESSAGE_TYPE_ID | typeof BOT_MESSAGE_TYPE_ID;
}

export interface MemberChatMessage extends SourceChatMessage {
    group: GroupShortInfo;
    messageTypeId: typeof MEMBER_MESSAGE_TYPE_ID;
}

export interface ChatMessageSearch extends MemberChatMessage {
    chatId: number;
}

export type ChatMessage = SystemChatMessage | MemberChatMessage;
