import React, { useState } from "react";
import { Button, Form, message } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

import { inAppProductDetailsPostAction } from "features/banking-moderation/store/actions";
import { ScrollableModal } from "shared/components/ScrollableModal";
import { InAppProductDetailsForm, InAppProductDetailsFormInitialValues } from "../components/InAppProductDetailsForm";

export interface ProductDetailsModalContainerProps {
    stage: string;
    inAppProductId: number;
}

export const ProductDetailsModalContainer = ({ stage, inAppProductId }: ProductDetailsModalContainerProps) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm<InAppProductDetailsFormInitialValues>();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => setIsModalOpen(true);
    const hideModal = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const handleOnFinish = async () => {
        const { thumbnail_256, thumbnail_1024, ...restFormData } = await form.validateFields();

        if (!thumbnail_256 || !thumbnail_1024) {
            message.error("Please select two thumbnails");
            return;
        }

        if (!inAppProductId) {
            message.error('Something went wrong. "inAppProductId" value is missed');
        }

        dispatch(
            inAppProductDetailsPostAction({
                stage,
                data: { inAppProductId, ...restFormData },
                thumbnails: [
                    { file: thumbnail_256, resolution: "256x256" },
                    { file: thumbnail_1024, resolution: "1024x1024" }
                ]
            })
        );

        hideModal();
    };

    return (
        <>
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal} />

            <ScrollableModal
                title="In-App Product Details"
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
                <InAppProductDetailsForm stage={stage} form={form} />
            </ScrollableModal>
        </>
    );
};
