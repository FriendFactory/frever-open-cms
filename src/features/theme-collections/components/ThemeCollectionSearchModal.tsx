import React, { useState } from "react";
import { ScrollableModal } from "shared";

interface ThemeCollectionSearchModalProps {
    children: React.ReactNode;
}

export function ThemeCollectionSearchModal({ children }: ThemeCollectionSearchModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const hideModal = () => setIsModalOpen(false);

    return (
        <>
            <a onClick={showModal}>Add to theme collection</a>
            <ScrollableModal
                title="Theme Collection search"
                width="95%"
                open={isModalOpen}
                onCancel={hideModal}
                destroyOnClose
                footer={false}>
                {children}
            </ScrollableModal>
        </>
    );
}
