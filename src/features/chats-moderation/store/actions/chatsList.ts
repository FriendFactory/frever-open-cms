import { defineAction, defineActionGroup } from "rd-redux-utils";

import { ChatInfo, ChatListQueryParams } from "features/chats-moderation/services";

export const chatsListActionGroup = defineActionGroup<{ stage: string; params: ChatListQueryParams }>("CHATS LIST");

export const chatsListLoadingAction = chatsListActionGroup.defineAction("LOADING");

export const chatsListLoadedOkAction = chatsListActionGroup.defineAction<{ data: ChatInfo[] }>("LOADED OK");

export const chatsListLoadedErrorAction = chatsListActionGroup.defineAction<{ error: string }>("LOADED ERROR");

export const chatsListByUserLoadAction = defineAction<{ mainGroupId: number }>("CHAT LIST BY USER LOAD");
