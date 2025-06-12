import React, { memo } from "react";
import { Link } from "react-router-dom";
import reactStringReplace from "react-string-replace";

import { GroupShortInfo } from "features/chats-moderation/services";
import { USER_DETAILS_INFO_URL } from "urls";

interface MessageTextProps {
    stage: string;
    text: string;
    mentions: GroupShortInfo[];
}

const PATTERN = /@(\d+)/g;

export const MessageText: React.FC<MessageTextProps> = memo(
    ({ text, mentions, stage }) => {
        return (
            <span>
                {reactStringReplace(text, PATTERN, (match, index) => {
                    const groupId = Number(match);
                    const group = mentions.find((el) => el.id === groupId);

                    if (group) {
                        return (
                            <Link
                                key={index}
                                to={USER_DETAILS_INFO_URL.format({ stage, selector: "mainGroupId", id: group.id })}>
                                @{group.nickname ?? match}
                            </Link>
                        );
                    }

                    return match;
                })}
            </span>
        );
    },
    (p, n) => p.text === n.text
);
