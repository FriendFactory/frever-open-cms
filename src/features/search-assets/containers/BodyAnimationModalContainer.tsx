import React, { useState } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { AssetSearchTableContainer } from "shared/containers/AssetSearchTableContainer";
import { BodyAnimationAsset } from "../services";

interface BodyAnimationModalContainerProps {
    stage: string;
    btnText: string;
    onClick: (bodyAnimation: BodyAnimationAsset) => void;
}

export function BodyAnimationModalContainer({ stage, btnText, onClick }: BodyAnimationModalContainerProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <a onClick={() => setIsModalOpen(true)}>{btnText}</a>
            <Modal
                title="Body Animation Search"
                open={isModalOpen}
                width={1360}
                centered
                onCancel={() => setIsModalOpen(false)}>
                <AssetSearchTableContainer
                    stage={stage}
                    asset="BodyAnimation"
                    actionColumn={{
                        title: "",
                        width: 65,
                        render: (_, entity) => (
                            <Button
                                type="primary"
                                ghost
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    onClick(entity as BodyAnimationAsset);
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
