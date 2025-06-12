import { NoticeType } from "antd/es/message/interface";
import { Action } from "redux";

import { addPopUpMessageAction, clearPopUpMessageAction } from "../actions";

export interface PopUpMessageState {
    messageText: string;
    messageStyle: NoticeType;
    link?: string;
    key?: string;
    duration?: number;
}

export const popUpMessageReducer = (state: PopUpMessageState | undefined, action: Action): PopUpMessageState => {
    if (!state) {
        state = {
            messageText: "",
            messageStyle: "info"
        };
    }

    if (addPopUpMessageAction.is(action)) {
        return {
            messageText: action.messageText,
            messageStyle: action.messageStyle ?? "info",
            link: action.link,
            key: action.key,
            duration: action.duration
        };
    }
    if (clearPopUpMessageAction.is(action)) {
        return {
            messageText: "",
            messageStyle: "info"
        };
    }

    return state;
};
