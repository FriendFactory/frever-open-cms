import React, { useState } from "react";
import { Button, Typography } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { ScrollableModal } from "shared";
import { Keyframe } from "features/search-assets/services";

interface WardrobeKeyframePreviewProps {
    keyframes: Keyframe;
}

export function WardrobeKeyframePreview({ keyframes }: WardrobeKeyframePreviewProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const destroyModal = () => setIsModalOpen(false);
    const showModal = () => setIsModalOpen(true);
    return (
        <>
            <Button size="small" shape="circle" type="link" onClick={showModal} icon={<QuestionCircleOutlined />} />
            <ScrollableModal open={isModalOpen} destroyOnClose onCancel={destroyModal} footer={false}>
                <Typography>
                    <pre>{JSON.stringify(keyframes, null, 2)}</pre>
                </Typography>
            </ScrollableModal>
        </>
    );
}
