import { ChatMessage } from "features/chats-moderation/services";

export interface ChatMessageReport {
    id: number;
    groupId: number;
    reasonId: number;
    reportText: string;
    createdTime: string;
    closedTime: string | null;
    hideMessage: boolean;
    chatMessageId: number;
    chatId: number;

    // A field that must be loaded manually. This is needed for the ReportedChatMessage list page
    reportMessage?: ChatMessage;
}
