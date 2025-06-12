import { Modal } from "antd";
import React, { useCallback, useState } from "react";

export function WardrobeListModal({ children }: { children: JSX.Element }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = useCallback(() => setIsModalOpen(true), []);
    const hideModal = useCallback(() => setIsModalOpen(false), []);

    return (
        <>
            <a onClick={showModal}>Add wardrobe</a>
            <Modal
                title="Wardrobe list"
                style={{ top: "20px" }}
                width="95%"
                open={isModalOpen}
                onCancel={hideModal}
                destroyOnClose
                footer={false}>
                {children}
            </Modal>
        </>
    );
}
