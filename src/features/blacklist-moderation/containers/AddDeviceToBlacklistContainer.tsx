import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { ShortDeviceData } from "../services";
import { useCurrentStage } from "shared";
import { addDeviceToBlacklistAction } from "../store/actions/deviceBlacklist";
import { AddDeviceToBlacklistForm } from "../components/AddDeviceToBlacklistForm";

export function AddDeviceToBlacklistContainer() {
    const stage = useCurrentStage();
    const dispatch = useDispatch();
    const [form] = Form.useForm<ShortDeviceData>();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const hideModal = () => setIsModalOpen(false);

    const handleOnFinish = async () => {
        const data = await form.validateFields();
        dispatch(addDeviceToBlacklistAction({ stage, data }));
        hideModal();
    };

    return (
        <>
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal} />

            <Modal
                title="Add device to blacklist"
                open={isModalOpen}
                destroyOnClose
                onCancel={hideModal}
                footer={
                    <>
                        <Button onClick={hideModal}>Close</Button>
                        <Button type="primary" onClick={handleOnFinish}>
                            Add
                        </Button>
                    </>
                }>
                <AddDeviceToBlacklistForm form={form} />
            </Modal>
        </>
    );
}
