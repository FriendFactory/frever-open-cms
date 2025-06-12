import React, { useState } from "react";
import { Button, Form } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

import { ScrollableModal, useCurrentStage } from "shared";
import { upsertBotAction } from "../store/actions";
import { BotForm, UserCard, UserSearchWindow } from "../components/BotForm";
import { Bot } from "../services";

export interface CreateBotFormContainerProps {
    userSearchWindowComponent: UserSearchWindow;
    userCardComponent: UserCard;
}

export const CreateBotFormContainer = ({
    userCardComponent,
    userSearchWindowComponent
}: CreateBotFormContainerProps) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm<Bot>();
    const stage = useCurrentStage();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const hideModal = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleOnFinish = async () => {
        const data = await form.validateFields();
        dispatch(upsertBotAction({ stage, data }));

        hideModal();
        form.resetFields();
    };

    return (
        <>
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal} />

            <ScrollableModal
                title="Create Bot"
                open={isModalOpen}
                destroyOnClose
                onCancel={hideModal}
                footer={[
                    <Button key="close" onClick={hideModal}>
                        Close
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOnFinish}>
                        Create
                    </Button>
                ]}>
                <BotForm
                    form={form}
                    userCardComponent={userCardComponent}
                    userSearchWindowComponent={userSearchWindowComponent}
                />
            </ScrollableModal>
        </>
    );
};
