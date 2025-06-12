import React, { useState } from "react";
import { Button, Form, Typography } from "antd";
import { useDispatch } from "react-redux";

import { ScrollableModal } from "shared";
import { WardrobeBakingAvailabilityForm } from "features/search-assets/components/AssetDetails/WardrobeBakingView/WardrobeBakingAvailabilityForm";
import { WardrobeBakingAvailability } from "features/search-assets/services";
import { updateWardrobeBakingAvailabilityAction } from "features/search-assets/store";

interface WardrobeBakingAvailabilityContainerProps {
    stage: string;
    wardrobeId: number;
    isAvailable: boolean;
}

export const WardrobeBakingAvailabilityContainer = ({
    stage,
    wardrobeId,
    isAvailable
}: WardrobeBakingAvailabilityContainerProps) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm<WardrobeBakingAvailability>();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const hideModal = () => setIsModalOpen(false);

    const handleOnFinish = async () => {
        const data = await form.validateFields();

        dispatch(updateWardrobeBakingAvailabilityAction({ stage, data }));
        hideModal();
    };

    return (
        <>
            <Typography.Link onClick={showModal}>Change</Typography.Link>

            <ScrollableModal
                title="Update Wardrobe Baking Availability"
                open={isModalOpen}
                destroyOnClose
                onCancel={hideModal}
                footer={[
                    <Button key="close" onClick={hideModal}>
                        Close
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOnFinish}>
                        Update
                    </Button>
                ]}>
                <WardrobeBakingAvailabilityForm form={form} initialValues={{ wardrobeId, isAvailable: isAvailable }} />
            </ScrollableModal>
        </>
    );
};
