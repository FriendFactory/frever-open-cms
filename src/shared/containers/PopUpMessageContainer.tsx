import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { App } from "antd";
import { useHistory } from "react-router";

import { AppState } from "app-state";

export function PopUpMessageContainer() {
    const history = useHistory();
    const { message } = App.useApp();

    const { messageText, messageStyle, link, key, duration } = useSelector((state: AppState) => state.popUpMessage);

    useEffect(() => {
        if (messageText) {
            const content = link ? (
                <span>
                    {messageText} <a onClick={() => history.push(link)}>Check</a>
                </span>
            ) : (
                messageText
            );
            const messageContainer = message[messageStyle];
            if (messageContainer !== undefined) {
                message[messageStyle]({
                    content,
                    key: key ?? "",
                    duration: duration ?? 4
                });
            }
        }
    });

    return <></>;
}
