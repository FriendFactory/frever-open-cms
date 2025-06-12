import React from "react";
import { Button, Divider, List, Popconfirm, Space } from "antd";
import { CommentOutlined, EyeOutlined, LikeOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { Video, VideoPatchRequest } from "../services";
import { VideoCard } from "./VideoCard";
import { useCurrentStage } from "shared";
import { VideoPosition } from "./VideoPosition";

export interface ColdStartListProps {
    data: Video[];
    loading: boolean;
    onSetStartListItem: (videoId: number, data: VideoPatchRequest) => void;
}

export function ColdStartList({ data, loading, onSetStartListItem }: ColdStartListProps) {
    const stage = useCurrentStage();
    return (
        <List
            loading={loading}
            dataSource={data}
            pagination={false}
            itemLayout="horizontal"
            renderItem={(item) => (
                <List.Item
                    actions={[
                        <Popconfirm
                            title="Confirm?"
                            okType="danger"
                            okText="Confirm"
                            onConfirm={() => onSetStartListItem(item.id, { startListItem: 0 })}>
                            <Button type="text" danger>
                                Remove
                            </Button>
                        </Popconfirm>
                    ]}>
                    <List.Item.Meta
                        title={
                            <VideoPosition
                                label="Position"
                                onEditFinish={(startListItem) =>
                                    onSetStartListItem(item.id, { startListItem: startListItem as number })
                                }
                                defaultValue={item.startListItem}
                            />
                        }
                        avatar={
                            <VideoCardWrapper>
                                <VideoCard value={item} stage={stage} />
                            </VideoCardWrapper>
                        }
                        description={
                            <Space direction="vertical" style={{ justifyContent: "space-between" }}>
                                <Space wrap split={<Divider type="vertical" />}>
                                    <span>Author: {item.groupNickName}</span>
                                    {item.songName && <span>Song: {item.songName}</span>}
                                </Space>

                                <Space size="middle">
                                    <Space>
                                        <EyeOutlined />
                                        {item.kpi?.views}
                                    </Space>
                                    <Space>
                                        <CommentOutlined />
                                        {item.kpi?.comments}
                                    </Space>
                                    <Space>
                                        <LikeOutlined />
                                        {item.kpi?.likes}
                                    </Space>
                                </Space>
                            </Space>
                        }
                    />
                </List.Item>
            )}
        />
    );
}

const VideoCardWrapper = styled.div`
    width: 140px;
`;
