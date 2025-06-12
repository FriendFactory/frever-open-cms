import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { FormInstance } from "antd/lib/form/Form";

import { ScrollableModal, useCurrentStage } from "shared";
import { creatorMessageUpsertAction } from "../store/actions";
import { StarCreatorWelcomeMessage } from "../services";
import { GroupIdFormItem, UserCard, UserSearchWindow } from "../components/GroupIdFormItem";

export interface CreateCreatorMessageContainerProps {
    userSearchWindowComponent: UserSearchWindow;
    userCardComponent: UserCard;
}

export const CreateCreatorMessageContainer = ({
    userCardComponent,
    userSearchWindowComponent
}: CreateCreatorMessageContainerProps) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm<StarCreatorWelcomeMessage>();
    const stage = useCurrentStage();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const hideModal = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleOnFinish = async () => {
        const data = await form.validateFields();
        dispatch(creatorMessageUpsertAction({ stage, data }));

        hideModal();
        form.resetFields();
    };

    return (
        <>
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal} />

            <ScrollableModal
                title="Create new"
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
                <Form layout="vertical" form={form}>
                    <Form.Item shouldUpdate label="Profile" rules={rules}>
                        {(props: FormInstance<StarCreatorWelcomeMessage>) => (
                            <GroupIdFormItem
                                {...props}
                                userCardComponent={userCardComponent}
                                userSearchWindowComponent={userSearchWindowComponent}
                            />
                        )}
                    </Form.Item>

                    <Form.Item name="welcomeMessage" label="Welcome Message">
                        <Input.TextArea maxLength={130} showCount />
                    </Form.Item>
                </Form>
            </ScrollableModal>
        </>
    );
};

const rules = [{ required: true }];
