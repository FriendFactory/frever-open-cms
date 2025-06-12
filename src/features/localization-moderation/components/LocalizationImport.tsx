import React, { useEffect, useRef, useState } from "react";
import { Button, message, Modal, Popconfirm, Typography } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

import { LocalizationImportType } from "../services";

export interface LocalizationImportProps {
    title: string;
    description: string;
    handleUpdate: (file: File) => void;
    importType: LocalizationImportType;
}

export const LocalizationImport = ({ title, description, importType, handleUpdate }: LocalizationImportProps) => {
    const refUpload = useRef<HTMLInputElement>(null);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openDialog = () => setIsOpenDialog(true);
    const closeDialog = () => setIsOpenDialog(false);
    const showModal = () => setIsModalOpen(true);
    const hideModal = () => setIsModalOpen(false);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = event.target.files?.[0];

        if (file) {
            if (file.type !== "text/csv") {
                message.error("File extension is not valid");
                return;
            }
            handleUpdate(file);

            //Avoid situations where onChange does not fire when the filename is the same.
            event.target.value = "";
        }
    };

    const onConfirm = () => {
        refUpload?.current?.click();
        hideModal();
    };

    useEffect(() => {
        if (isOpenDialog) {
            if (importType === "Replace") {
                showModal();
            } else {
                refUpload?.current?.click();
            }
            closeDialog();
        }
    }, [openDialog]);

    return (
        <>
            <Modal
                title={
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <ExclamationCircleFilled style={{ color: "#ad393a", fontSize: "18px" }} />{" "}
                        <Typography.Text>Localization - Replace</Typography.Text>
                    </div>
                }
                open={isModalOpen}
                destroyOnClose
                onCancel={hideModal}
                footer={
                    <>
                        <Button onClick={hideModal}>No</Button>
                        <Button type="primary" danger onClick={onConfirm}>
                            Yes
                        </Button>
                    </>
                }>
                <Typography.Text type="warning">
                    <Typography.Text type="danger">Warning:</Typography.Text> This operation will permanently delete all
                    existing localization terms. This action cannot be undone. It's highly recommended to create a
                    backup before proceeding. Are you sure you want to continue?
                </Typography.Text>
            </Modal>
            <Popconfirm
                title={title}
                description={description}
                onConfirm={openDialog}
                okText="Confirm"
                okType="danger"
                cancelText="Cancel">
                <Typography>{title}</Typography>
            </Popconfirm>
            <input
                ref={refUpload}
                style={{ display: "none" }}
                type="file"
                accept="text/csv"
                onChange={handleOnChange}
            />
        </>
    );
};
