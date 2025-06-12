import React, { useState } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { AssetSearchTableContainer } from "shared/containers/AssetSearchTableContainer";
import { useCurrentStage } from "shared";

interface SpawnsSearchContainerProps {
    checkIsLinked: (spawnPosId: number) => boolean;
    onChangeLinkingStatus: (adction: "add" | "remove", spawnPosId: number) => void;
}

export function SpawnsSearchContainer({ checkIsLinked, onChangeLinkingStatus }: SpawnsSearchContainerProps) {
    const stage = useCurrentStage();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => setIsModalOpen(true);
    const hideModal = () => setIsModalOpen(false);

    return (
        <>
            <Button icon={<PlusOutlined />} onClick={openModal}>
                Add more
            </Button>

            <Modal
                title="Spawn position search"
                width="100%"
                style={{ top: "20px", maxHeight: "100vh" }}
                open={isModalOpen}
                onCancel={hideModal}
                destroyOnClose
                footer={false}>
                <AssetSearchTableContainer
                    stage={stage}
                    asset="CharacterSpawnPosition"
                    actionColumn={{
                        title: "",
                        width: 65,
                        align: "right",
                        render: (_, item) =>
                            checkIsLinked(item.id) ? (
                                <Button type="link" danger onClick={() => onChangeLinkingStatus("remove", item.id)}>
                                    Remove
                                </Button>
                            ) : (
                                <Button type="link" onClick={() => onChangeLinkingStatus("add", item.id)}>
                                    Add
                                </Button>
                            )
                    }}
                />
            </Modal>
        </>
    );
}
