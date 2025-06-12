import React from "react";

import { Button, Space } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import { CHAT_HISTORY_LIST_BASE_PAGE_SIZE, CHAT_HISTORY_PAGE_URL } from "urls";

import { useHistory, useLocation } from "react-router";
import { chatResultSelector } from "../store/reducer";
import { ChatQueryParams } from "../services";

export function SwitchPageContainer() {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = CHAT_HISTORY_PAGE_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const info = useSelector(chatResultSelector(urlMatch.params.stage, urlMatch.params.chatId));

    const onClick = (page: "prev" | "next") => () => {
        const params: ChatQueryParams = {
            takeOlder: 0,
            takeNewer: 0
        };

        if (page === "prev") {
            params.target = info.firstTarget;
            params.takeNewer = CHAT_HISTORY_LIST_BASE_PAGE_SIZE;
        }

        if (page === "next") {
            params.target = info.lastTarget;
            params.takeOlder = CHAT_HISTORY_LIST_BASE_PAGE_SIZE;
        }

        history.push(CHAT_HISTORY_PAGE_URL.format(urlMatch.params, params));
    };

    return (
        <Space>
            <Button disabled={!info.hasPrev} onClick={onClick("prev")} icon={<LeftOutlined />} />
            <Button disabled={!info.hasNext} onClick={onClick("next")} icon={<RightOutlined />} />
        </Space>
    );
}
