import React, { useState } from "react";
import { Button, Modal } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import { AssetSearchContainer } from "shared/containers/AssetSearchContainer";
import { EditorSettingsAssetsType } from "./AssetListFieldContainer";

export interface AssetListModalProps {
    stage: string;
    assetType: EditorSettingsAssetsType;
    handleOnChangeFieldValue: (id: number, action: "add" | "remove") => () => void;
    checkIsAssetLinked: (id: number) => boolean;
}

export function AssetListModal({
    stage,
    assetType,
    handleOnChangeFieldValue,
    checkIsAssetLinked
}: AssetListModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <Button type="link" onClick={() => setIsModalOpen(true)}>
                Add
            </Button>

            <Modal
                title={`${assetType} list`}
                width="95%"
                style={{ top: "20px" }}
                styles={{ body: { overflowY: "auto", maxHeight: "calc(100vh - 100px)" } }}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                destroyOnClose
                footer={false}>
                <AssetSearchContainer
                    stage={stage}
                    asset={assetType}
                    renderActionComponent={(asset) => {
                        const isLinked = checkIsAssetLinked(asset.id);
                        return (
                            <Button
                                type="primary"
                                ghost
                                danger={isLinked}
                                icon={isLinked ? <MinusOutlined /> : <PlusOutlined />}
                                onClick={handleOnChangeFieldValue(asset.id, isLinked ? "remove" : "add")}
                            />
                        );
                    }}
                />
            </Modal>
        </>
    );
}
