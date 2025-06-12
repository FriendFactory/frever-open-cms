import React, { useState } from "react";
import { Button, Form, Modal } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

import { useCurrentStage } from "shared";
import { storageFilePostAction } from "../store/actions";
import { StorageFileForm, StorageFileFormValues } from "../components/StorageFileForm";
import { FileExtensions } from "config";

export const STORAGE_FILE_FORM_ID = "STORAGE_FILE_FORM";

export const StorageFileFormContainer = () => {
    const dispatch = useDispatch();
    const stage = useCurrentStage();

    const [form] = Form.useForm<StorageFileFormValues>();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => !isModalOpen && setIsModalOpen(true);
    const destroyModal = () => isModalOpen && setIsModalOpen(false);

    const handleOnReset = () => {
        form.resetFields();
        destroyModal();
    };

    const handleOnFinish = async () => {
        const { file, ...data } = await form.validateFields();

        if (file && data.key)
            dispatch(storageFilePostAction({ stage, data: { ...data, extension: FileExtensions.Png }, file }));

        destroyModal();
    };

    return (
        <>
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal} />

            <Modal
                title="Add Storage File"
                destroyOnClose
                open={isModalOpen}
                onCancel={handleOnReset}
                footer={[
                    <Button key="reset" onClick={handleOnReset}>
                        Discard
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOnFinish}>
                        Submit
                    </Button>
                ]}>
                <StorageFileForm form={form} />
            </Modal>
        </>
    );
};
