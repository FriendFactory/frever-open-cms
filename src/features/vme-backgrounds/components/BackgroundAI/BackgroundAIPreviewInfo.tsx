import React from "react";
import { Button, Descriptions, DescriptionsProps, Popover } from "antd";
import { InfoOutlined } from "@ant-design/icons";

import { ReplicateInputType } from "features/vme-backgrounds/helpers";

export interface BackgroundAIPreviewInfoProps {
    params: ReplicateInputType;
}

export function BackgroundAIPreviewInfo({ params }: BackgroundAIPreviewInfoProps) {
    const items: DescriptionsProps["items"] = [
        {
            key: "version",
            label: "Version",
            children: params.version
        },
        {
            key: "size",
            label: "Size",
            children: `${params.input.width} x ${params.input.height}`
        },
        {
            key: "prompt",
            label: "Prompt",
            children: params.input.prompt
        }
    ];
    return (
        <Popover
            content={
                <Descriptions
                    items={items}
                    layout="horizontal"
                    bordered
                    column={1}
                    style={{ width: "512px", height: "250px", overflowY: "auto" }}
                />
            }>
            <Button type="primary" ghost shape="circle" size="small" icon={<InfoOutlined />} />
        </Popover>
    );
}
