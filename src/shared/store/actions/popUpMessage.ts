import { defineAction } from "rd-redux-utils";
import { NoticeType } from "antd/es/message/interface";

export const addPopUpMessageAction =
    defineAction<{ messageText: string; messageStyle?: NoticeType; link?: string; key?: string; duration?: number }>(
        "ADD POP UP MESSAGE"
    );

export const clearPopUpMessageAction = defineAction("CLEAR POP UP MESSAGE");
