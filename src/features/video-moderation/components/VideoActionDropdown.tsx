import React from "react";
import { Button, Dropdown } from "antd";
import { MoreOutlined, OrderedListOutlined, VideoCameraAddOutlined } from "@ant-design/icons";

import { Video } from "../services";
import { CreateTemplateContainer } from "../containers/CreateTemplateContainer";
import { CreateTaskContainer } from "features/video-tasks/containers/CreateTask/CreateTaskContainer";
import { AddVideoToColdStartContainer } from "../containers/AddVideoToColdStartContainer";
import { ItemType } from "antd/lib/menu/hooks/useItems";

export interface VideoActionDropdownProps {
    stage: string;
    video: Video;
}

export function VideoActionDropdown({ stage, video }: VideoActionDropdownProps) {
    const items: ItemType[] = [];

    if (video.levelId) {
        items.push(
            {
                key: "create-task-btn",
                icon: <VideoCameraAddOutlined />,
                label: (
                    <div onKeyDown={(e) => e.stopPropagation()}>
                        <CreateTaskContainer button="Task" stage={stage} levelId={video.levelId} />
                    </div>
                )
            },
            {
                key: "create-tempalte-btn",
                icon: <VideoCameraAddOutlined />,
                label: (
                    <div onKeyDown={(e) => e.stopPropagation()}>
                        <CreateTemplateContainer btnText="Template" stage={stage} levelId={video.levelId} />
                    </div>
                )
            }
        );
    }

    if (!video.startListItem) {
        items.push({
            key: "set-start-list-item",
            icon: <OrderedListOutlined />,
            label: (
                <div onKeyDown={(e) => e.stopPropagation()}>
                    <AddVideoToColdStartContainer button={<div>Add to the Cold Start</div>} initialValues={{ video }} />
                </div>
            )
        });
    }

    return (
        <Dropdown menu={{ items }}>
            <Button icon={<MoreOutlined />}></Button>
        </Dropdown>
    );
}
