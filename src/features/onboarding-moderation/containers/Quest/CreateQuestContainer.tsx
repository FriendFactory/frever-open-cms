import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { updateEntityListAction } from "../../store/actions";
import { OnboardingQuest } from "../../services";
import { CreateQuestForm } from "../../components/CreateQuestForm";
import { useQuestTypeData } from "../../hooks/useQuestTypeData";
import { LoadingContainer } from "shared";
import { cleanEmptyValues } from "features/onboarding-moderation/helpers";

export interface CreateQuestContainerProps {
    stage: string;
    questGroupId: number;
}

export function CreateQuestContainer({ stage, questGroupId }: CreateQuestContainerProps) {
    const dispatch = useDispatch();

    const [form] = useForm<Omit<OnboardingQuest, "onboardingQuestGroupId">>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { info } = useQuestTypeData();

    const destroyModal = () => setIsModalOpen(false);
    const showModal = () => setIsModalOpen(true);

    const handleOnSubmit = async () => {
        const { ...formData } = await form.validateFields();
        const entity = cleanEmptyValues(formData, ["title", "description"]);

        dispatch(
            updateEntityListAction({
                stage,
                entityType: "quest",
                entity: { onboardingQuestGroupId: questGroupId, ...entity }
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
                title="Create Quest"
                open={isModalOpen}
                width="768px"
                maskClosable={false}
                onCancel={handleOnReset}
                onOk={handleOnSubmit}
                okType="primary"
                okText="Create">
                <CreateQuestForm form={form} questTypes={info?.data ?? []} />
                <LoadingContainer loading={info.loading} />
            </Modal>
        </>
    );
}
