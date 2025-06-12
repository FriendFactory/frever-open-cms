import React, { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { ScrollableModal, useCurrentStage } from "shared";
import { upsertEmotionsAction } from "../store/actions";
import { Emotion } from "../services";
import { CreateEmotionForm } from "../components/CreateEmotionForm";

export type CreateEmotionFormProps = Partial<Emotion>;

export function CreateEmotionContainer() {
    const stage = useCurrentStage();
    const dispatch = useDispatch();

    const [form] = useForm<CreateEmotionFormProps>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = () => setIsModalOpen(true);

    const discard = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleOnFinish = async () => {
        const emotion = await form.validateFields();
        dispatch(upsertEmotionsAction({ stage, data: emotion }));
        setIsModalOpen(false);
        form.resetFields();
    };

    return (
        <>
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal}>
                Create
            </Button>

            <ScrollableModal
                title="Create new emotion"
                open={isModalOpen}
                width={400}
                closeIcon={null}
                onOk={handleOnFinish}
                onCancel={discard}
                destroyOnClose>
                <CreateEmotionForm form={form} />
            </ScrollableModal>
        </>
    );
}
