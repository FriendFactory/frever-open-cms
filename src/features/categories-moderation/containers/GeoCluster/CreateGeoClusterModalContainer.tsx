import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";

import { ScrollableModal, useCurrentStage } from "shared";
import { GeoCluster } from "features/categories-moderation/services";
import { createGeoClusterAction } from "features/categories-moderation/store/actions";
import { GeoClusterFormContainer } from "./GeoClusterFormContainer";

export function CreateGeoClusterModalContainer() {
    const stage = useCurrentStage();
    const dispatch = useDispatch();

    const [form] = useForm<Partial<GeoCluster>>();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const destroyModal = () => {
        form.resetFields();
        setIsModalOpen(false);
    };
    const showModal = () => setIsModalOpen(true);

    const handleOnFinish = async () => {
        const data = await form.validateFields();

        dispatch(createGeoClusterAction({ stage, data }));
        destroyModal();
    };

    return (
        <>
            <Button ghost type="primary" onClick={showModal} icon={<PlusOutlined />} />
            <ScrollableModal
                title="Add new geo cluster"
                open={isModalOpen}
                destroyOnClose
                onCancel={destroyModal}
                footer={[
                    <Button key="cancel" onClick={destroyModal}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOnFinish}>
                        Create
                    </Button>
                ]}>
                <GeoClusterFormContainer form={form} initialValues={initialValues} />
            </ScrollableModal>
        </>
    );
}

const initialValues = {
    recommendationVideosPool: 3000,
    recommendationNumOfDaysLookback: 10,
    includeVideoFromCountry: [],
    excludeVideoFromCountry: [],
    includeVideoWithLanguage: [],
    excludeVideoWithLanguage: [],
    showToUserFromCountry: [],
    hideForUserFromCountry: [],
    showForUserWithLanguage: [],
    hideForUserWithLanguage: []
};
