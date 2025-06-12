import React from "react";
import { Space, Skeleton as AntdSkeleton, Collapse as AntdCollapse } from "antd";
import styled from "styled-components";

import { MessageText } from "./MessageText";

import { ImageFileContainer } from "features/crews-moderation/containers/ImageFileContainer";
import { ChatConversationMessage } from "features/community-moderation/services/api";
import { ChatVideoThumbnailContainer } from "features/chats-moderation/containers/ChatVideoThumbnailContainer";

const MEDIA_HEIGHT = 200;

export interface ChatMessageContentProps {
    stage: string;
    message?: ChatConversationMessage;
    mediaHeight?: number;
    collapseMediaContent?: boolean;
}

export function ChatMessageContent({ stage, message, mediaHeight, collapseMediaContent }: ChatMessageContentProps) {
    const MediaContent = () => (
        <Space align="start">
            {message?.files?.map((file) => (
                <React.Fragment key={file.version}>
                    <ImageFileContainer
                        key={file.version}
                        entityName="ChatMessage"
                        stage={stage}
                        id={message.id}
                        version={file.version!}
                        height={mediaHeight ?? MEDIA_HEIGHT}
                        skeleton={<Skeleton height={mediaHeight ?? MEDIA_HEIGHT} />}
                    />
                </React.Fragment>
            ))}

            {message?.videoId && (
                <ChatVideoThumbnailContainer
                    stage={stage}
                    videoId={message.videoId}
                    height={mediaHeight ?? MEDIA_HEIGHT}
                    skeleton={<Skeleton height={mediaHeight ?? MEDIA_HEIGHT} />}
                />
            )}
        </Space>
    );

    return (
        <Space direction="vertical" size="small">
            {!!message?.text && <MessageText stage={stage} text={message.text} mentions={message.mentions} />}

            {(message?.videoId || !!message?.files?.length) &&
                (collapseMediaContent ? (
                    <Collapse
                        ghost
                        items={[
                            {
                                forceRender: true,
                                label: "Show media",
                                key: message.id,
                                children: <MediaContent />
                            }
                        ]}
                    />
                ) : (
                    <MediaContent />
                ))}
        </Space>
    );
}

const Collapse = styled(AntdCollapse)`
    .ant-collapse-header {
        padding: 0 0 !important;
    }
`;

const Skeleton = styled(AntdSkeleton.Image)<{ height: number }>`
    height: ${(props) => props.height};
`;
