import React, { useState } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { AssetSearchTableContainer } from "shared/containers/AssetSearchTableContainer";
import { AssetTypes } from "config";
import { AssetData, AssetDataNames } from "features/search-assets/services";

interface AssetSearchModalContainerProps {
    asset: AssetTypes;
    stage: string;
    btnText: string;
    onClick: (bodyAnimation: AssetData[AssetDataNames]) => void;
}

export function AssetSearchModalContainer({ asset, stage, btnText, onClick }: AssetSearchModalContainerProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <a onClick={() => setIsModalOpen(true)}>{btnText}</a>
            <Modal
                title={`Search Asset (${asset})`}
                open={isModalOpen}
                width={1360}
                centered
                onCancel={() => setIsModalOpen(false)}>
                <AssetSearchTableContainer
                    stage={stage}
                    asset={asset}
                    actionColumn={{
                        title: "",
                        width: 65,
                        render: (_, entity) => (
                            <Button
                                type="primary"
                                ghost
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    onClick(entity);
                                    setIsModalOpen(false);
                                }}
                            />
                        )
                    }}
                />
            </Modal>
        </>
    );
}
