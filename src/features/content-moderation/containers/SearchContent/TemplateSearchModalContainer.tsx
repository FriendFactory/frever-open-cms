import React, { useState } from "react";
import { Button, Modal } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import { useCurrentStage } from "shared";
import { Template } from "features/video-templates/services";
import { CreatePageRowContentShortInfo } from "features/content-moderation/services";
import { TemplateSearchTableContainer } from "features/video-templates/containers/TemplateSearchTableContainer";

export interface TemplateSearchModalContainerProps {
    isLinked: (id: number) => boolean;
    changeStatusOfLinking: (content: CreatePageRowContentShortInfo) => void;
    bulkUpdate: (action: "add" | "remove", contents: CreatePageRowContentShortInfo[]) => void;
}

export function TemplateSearchModalContainer({
    isLinked,
    changeStatusOfLinking,
    bulkUpdate
}: TemplateSearchModalContainerProps) {
    const stage = useCurrentStage();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedEntities, setSelectedEntities] = useState<Template[] | null>([]);

    const rowSelection = {
        onChange: (selectedRowKeys: any[], selectedRows: Template[]) =>
            selectedRowKeys.length > 0 ? setSelectedEntities(selectedRows) : setSelectedEntities(null),
        selectedRowKeys: selectedEntities?.map((record) => record.id),
        fixed: true
    };

    const handleSelectedEntity = (action: "add" | "remove") => () => {
        bulkUpdate(
            action,
            selectedEntities!.map((asset) => ({ id: asset.id, title: asset.title, files: asset.files }))
        );
        setSelectedEntities(null);
    };

    return (
        <>
            <Button type="link" onClick={() => setIsModalOpen(true)}>
                Add Template
            </Button>

            <Modal
                title="Template search"
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
                <TemplateSearchTableContainer
                    stage={stage}
                    rowSelection={rowSelection}
                    actionColumn={{
                        title: "",
                        width: 65,
                        align: "right",
                        render: (_, template) => {
                            if ("files" in template) {
                                return (
                                    <Button
                                        type="primary"
                                        ghost
                                        danger={isLinked(template.id)}
                                        onClick={() =>
                                            changeStatusOfLinking({
                                                id: template.id,
                                                title: template.title,
                                                files: template.files
                                            })
                                        }
                                        icon={isLinked(template.id) ? <MinusOutlined /> : <PlusOutlined />}
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
