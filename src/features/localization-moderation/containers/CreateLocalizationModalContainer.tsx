import React, { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";
import { useDispatch } from "react-redux";

import { ScrollableModal, useCurrentStage } from "shared";
import { LocalizationForm } from "../components/LocalizationForm";
import { Localization } from "../services";
import { localizationPostAction } from "../store";

export function CreateLocalizationModalContainer() {
    const stage = useCurrentStage();
    const dispatch = useDispatch();
    const [form] = useForm<any>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const destroyModal = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const showModal = () => setIsModalOpen(true);

    const handleOnFinish = async () => {
        const data: Localization = await form.validateFields();

        const cleanValue = Object.fromEntries(Object.entries(data.values).filter(([_, v]) => v !== undefined));
        const newObj: any = { ...data, values: cleanValue };
        dispatch(localizationPostAction({ stage, postType: "add", data: newObj }));

        destroyModal();
    };

    return (
        <>
            <Button ghost type="primary" onClick={showModal} icon={<PlusOutlined />} />
            <ScrollableModal
                title="Add new Key"
                open={isModalOpen}
                destroyOnClose
                onCancel={destroyModal}
                footer={[
                    <Button key="cancel" onClick={destroyModal}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOnFinish}>
                        Create
                    </Button>
                ]}>
                <LocalizationForm form={form} />
            </ScrollableModal>
        </>
    );
}
