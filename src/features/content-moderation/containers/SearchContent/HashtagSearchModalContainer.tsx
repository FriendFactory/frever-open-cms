import React, { useState } from "react";
import { Button, Modal } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import { useCurrentStage } from "shared";
import { CreatePageRowContentShortInfo } from "features/content-moderation/services";
import { Hashtag } from "features/hashtag-moderation/services";
import { HashtagSearchTableContainer } from "features/hashtag-moderation";

export interface HashtagSearchModalContainerProps {
    isLinked: (id: number) => boolean;
    changeStatusOfLinking: (content: CreatePageRowContentShortInfo) => void;
    bulkUpdate: (action: "add" | "remove", contents: CreatePageRowContentShortInfo[]) => void;
}

export function HashtagSearchModalContainer({
    isLinked,
    changeStatusOfLinking,
    bulkUpdate
}: HashtagSearchModalContainerProps) {
    const stage = useCurrentStage();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedEntities, setSelectedEntities] = useState<Hashtag[] | null>([]);

    const rowSelection = {
        onChange: (selectedRowKeys: any[], selectedRows: Hashtag[]) =>
            selectedRowKeys.length > 0 ? setSelectedEntities(selectedRows) : setSelectedEntities(null),
        selectedRowKeys: selectedEntities?.map((record) => record.id),
        fixed: true
    };

    const handleSelectedEntity = (action: "add" | "remove") => () => {
        bulkUpdate(
            action,
            selectedEntities!.map((entity) => ({ id: entity.id, title: entity.name }))
        );
        setSelectedEntities(null);
    };

    return (
        <>
            <Button type="link" onClick={() => setIsModalOpen(true)}>
                Add Hashtag
            </Button>

            <Modal
                title="Hashtag Search"
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
                <HashtagSearchTableContainer
                    stage={stage}
                    rowSelection={rowSelection}
                    actionColumn={{
                        title: "",
                        width: 65,
                        align: "right",
                        render: (_, hashtag) => {
                            if ("name" in hashtag) {
                                return (
                                    <Button
                                        type="primary"
                                        ghost
                                        danger={isLinked(hashtag.id)}
                                        onClick={() =>
                                            changeStatusOfLinking({
                                                id: hashtag.id,
                                                title: hashtag.name
                                            })
                                        }
                                        icon={isLinked(hashtag.id) ? <MinusOutlined /> : <PlusOutlined />}
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
