import React, { useState } from "react";
import { Button, Modal } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import { useCurrentStage } from "shared";
import { CreatePageRowContentShortInfo } from "features/content-moderation/services";
import { Video, VideoSearchTableContainer } from "features/video-moderation";

export interface VideoSearchModalContainerProps {
    isLinked: (id: number) => boolean;
    changeStatusOfLinking: (content: CreatePageRowContentShortInfo) => void;
    bulkUpdate: (action: "add" | "remove", contents: CreatePageRowContentShortInfo[]) => void;
}

export function VideoSearchModalContainer({
    isLinked,
    changeStatusOfLinking,
    bulkUpdate
}: VideoSearchModalContainerProps) {
    const stage = useCurrentStage();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedEntities, setSelectedEntities] = useState<Video[] | null>([]);

    const rowSelection = {
        onChange: (selectedRowKeys: any[], selectedRows: Video[]) =>
            selectedRowKeys.length > 0 ? setSelectedEntities(selectedRows) : setSelectedEntities(null),
        selectedRowKeys: selectedEntities?.map((record) => record.id),
        fixed: true
    };

    const handleSelectedEntity = (action: "add" | "remove") => () => {
        bulkUpdate(
            action,
            selectedEntities!.map((entity) => ({ id: entity.id, thumbnailUrl: entity.thumbnailUrl }))
        );
        setSelectedEntities(null);
    };

    return (
        <>
            <Button type="link" onClick={() => setIsModalOpen(true)}>
                Add Video
            </Button>

            <Modal
                title="Video search"
                width="95%"
                centered
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                destroyOnClose
                footer={[
                    <Button key="cancel" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>,
                    <Button
                        disabled={!selectedEntities}
                        type="primary"
                        ghost
                        danger
                        key="remove"
                        onClick={handleSelectedEntity("remove")}>
                        Remove Selected
                    </Button>,
                    <Button
                        disabled={!selectedEntities}
                        type="primary"
                        ghost
                        key="add"
                        onClick={handleSelectedEntity("add")}>
                        Add Selected
                    </Button>
                ]}>
                <VideoSearchTableContainer
                    stage={stage}
                    rowSelection={rowSelection}
                    actionColumn={{
                        title: "",
                        width: 65,
                        align: "right",
                        render: (_, video) => {
                            if ("thumbnailUrl" in video) {
                                return (
                                    <Button
                                        type="primary"
                                        ghost
                                        danger={isLinked(video.id)}
                                        onClick={() =>
                                            changeStatusOfLinking({
                                                id: video.id,
                                                thumbnailUrl: video.thumbnailUrl
                                            })
                                        }
                                        icon={isLinked(video.id) ? <MinusOutlined /> : <PlusOutlined />}
                                    />
                                );
                            }
                            return null;
                        }
                    }}
                />
            </Modal>
        </>
    );
}
