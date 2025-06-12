import React, { useState } from "react";
import { Button, Form, Input, Switch, Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

import { useCurrentStage, ScrollableModal } from "shared";
import { upsertBotCommentAction } from "../store/actions";
import { BotComment } from "../services";

export interface CreateBotCommentContainerProps {}

export const CreateBotCommentContainer = ({}: CreateBotCommentContainerProps) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm<BotComment>();
    const stage = useCurrentStage();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const hideModal = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleOnFinish = async () => {
        const data = await form.validateFields();
        dispatch(upsertBotCommentAction({ stage, data }));

        hideModal();
        form.resetFields();
    };

    return (
        <>
            <Tooltip title="Create a new comment">
                <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal} />
            </Tooltip>

            <ScrollableModal
                title="Create Bot Comment"
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
                <Form form={form}>
                    <Form.Item name="commentText" label="Text">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="isEnabled" label="Is Enabled" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Form>
            </ScrollableModal>
        </>
    );
};
