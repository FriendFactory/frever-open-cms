import React from "react";
import { Modal, ModalProps } from "antd";

export function ScrollableModal({ children, ...modalProps }: ModalProps) {
    return (
        <Modal
            width={768}
            style={{ top: "20px" }}
            styles={{ body: { overflowY: "auto", maxHeight: "calc(100vh - 152px)" } }}
            {...modalProps}>
            {children}
        </Modal>
    );
}
