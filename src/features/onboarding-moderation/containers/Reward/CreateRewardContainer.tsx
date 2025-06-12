import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, useWatch } from "antd/lib/form/Form";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { updateEntityListAction } from "../../store/actions";
import { CreateRewardForm } from "../../components/CreateRewardForm";

export interface CreateRewardContainerProps {
    stage: string;
    questGroupId: number;
}

export function CreateRewardContainer({ stage, questGroupId }: CreateRewardContainerProps) {
    const dispatch = useDispatch();

    const [form] = useForm<any>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const watchFields = useWatch([], form);

    useEffect(() => {
        form.setFields([{ name: "reward", errors: undefined }]);
    }, [watchFields]);

    const destroyModal = () => setIsModalOpen(false);
    const showModal = () => setIsModalOpen(true);

    const handleOnSubmit = async () => {
        const { thumbnail, reward, ...data } = await form.validateFields();

        if (!hasFormReward(data, ["assetId", "softCurrency", "hardCurrency", "lootBoxId", "xp"])) {
            form.setFields([{ name: "reward", errors: ["Please enter/select reward value"] }]);
            return;
        }

        dispatch(
            updateEntityListAction({
                stage,
                entityType: "reward",
                entity: { onboardingQuestGroupId: questGroupId, ...data },
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
                title="Create Reward"
                open={isModalOpen}
                destroyOnClose
                width="768px"
                maskClosable={false}
                onCancel={handleOnReset}
                onOk={handleOnSubmit}
                okType="primary"
                okText="Create">
                <CreateRewardForm form={form} />
            </Modal>
        </>
    );
}

export const hasFormReward = <T extends {}>(formData: T, rewardsKeys: (keyof T)[]) =>
    rewardsKeys.some((key) => formData[key]);
