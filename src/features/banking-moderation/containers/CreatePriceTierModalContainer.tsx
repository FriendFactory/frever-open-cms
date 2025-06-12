import React, { useState } from "react";
import { Button, Form } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

import { InAppPriceTier } from "../services";
import { ScrollableModal } from "shared/components/ScrollableModal";
import { inAppPriceTiersPostInfoAction } from "../store/actions";
import { InAppPriceTierForm } from "../components/InAppPriceTierForm";

export interface CreatePriceTierModalContainerProps {
    stage: string;
}

export const CreatePriceTierModalContainer = ({ stage }: CreatePriceTierModalContainerProps) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm<InAppPriceTier>();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const hideModal = () => setIsModalOpen(false);

    const handleOnFinish = async () => {
        const data = await form.validateFields();

        dispatch(inAppPriceTiersPostInfoAction({ stage, data }));
        hideModal();
    };

    return (
        <>
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal} />

            <ScrollableModal
                title="Create new in-app price tier"
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
                <InAppPriceTierForm form={form} />
            </ScrollableModal>
        </>
    );
};
