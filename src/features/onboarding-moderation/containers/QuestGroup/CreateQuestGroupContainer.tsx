import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { updateEntityListAction } from "../../store/actions";
import { CreateQuestGroupForm } from "../../components/CreateQuestGroupForm";
import { useCurrentStage } from "shared";
import { cleanEmptyValues } from "features/onboarding-moderation/helpers";

export function CreateQuestGroupContainer() {
    const dispatch = useDispatch();
    const stage = useCurrentStage();

    const [form] = useForm<any>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const destroyModal = () => setIsModalOpen(false);
    const showModal = () => setIsModalOpen(true);

    const handleOnSubmit = async () => {
        const { thumbnail, ...formData } = await form.validateFields();
        const entity = cleanEmptyValues(formData, ["title", "description"]);

        dispatch(
            updateEntityListAction({
                stage,
                entityType: "questGroup",
                entity,
                thumbnail
            })
        );

        form.resetFields();
        destroyModal();
    };

    const handleOnReset = () => {
        form.resetFields();
        destroyModal();
    };

    return (
        <>
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal} />
            <Modal
                title="Create Quest Group"
                open={isModalOpen}
                destroyOnClose
                width="768px"
                maskClosable={false}
                onCancel={handleOnReset}
                onOk={handleOnSubmit}
                okType="primary"
                okText="Create">
                <CreateQuestGroupForm form={form} />
            </Modal>
        </>
    );
}
