import React, { useState } from "react";
import { Button, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";
import { useDispatch, useSelector } from "react-redux";

import { useCurrentStage } from "shared";
import { BackgroundAI } from "features/vme-backgrounds/services";
import { closeBackgroundAIPreviewAction, runBackgroundAIPreviewAction } from "features/vme-backgrounds/store/actions";
import { backgroundAIPreviewSelector } from "features/vme-backgrounds/store/reducer/BackgroundAI/backgroundAIPreviewReducer";
import { convertToReplicateInput } from "features/vme-backgrounds/helpers";
import { BackgroundAIPreview } from "features/vme-backgrounds/components/BackgroundAI/BackgroundAIPreview";

export const formId = "RUN_IMAGE_GENERATOR";

const initialValues = {
    totalImages: 10
};

interface BackgroundAIPreviewModalContainerProps {
    background?: BackgroundAI;
    loading: boolean;
}

export function BackgroundAIPreviewModalContainer({ background, loading }: BackgroundAIPreviewModalContainerProps) {
    if (!background) return null;

    const stage = useCurrentStage();
    const dispatch = useDispatch();
    const [form] = useForm<typeof initialValues>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dataPreview = useSelector(backgroundAIPreviewSelector);

    const destroyModal = () => {
        dispatch(closeBackgroundAIPreviewAction({}));
        setIsModalOpen(false);
    };
    const showModal = () => setIsModalOpen(true);

    const handleOnFinish = (data: typeof initialValues) => {
        const replicateInput = convertToReplicateInput(background, data.totalImages);
        dispatch(closeBackgroundAIPreviewAction({}));
        dispatch(runBackgroundAIPreviewAction({ stage, replicateInput }));
    };

    return (
        <>
            <Button size="large" type="link" loading={loading} icon={<EyeOutlined />} onClick={showModal}>
                Preview
            </Button>

            <Modal
                destroyOnClose
                maskClosable={false}
                width="980px"
                style={{ top: "20px" }}
                styles={{ body: { overflowY: "auto", maxHeight: "calc(100vh - 152px)" } }}
                title={`Preview (${background.name})`}
                open={isModalOpen}
                onCancel={destroyModal}
                footer={[
                    <Button key="close" onClick={destroyModal}>
                        Close
                    </Button>,
                    <Button key="run" htmlType="submit" type="primary" form={formId} disabled={dataPreview.loading}>
                        Show Preview
                    </Button>
                ]}>
                <BackgroundAIPreview
                    id={formId}
                    form={form}
                    initialValues={initialValues}
                    onFinish={handleOnFinish}
                    background={background}
                    previewImages={dataPreview}
                />
            </Modal>
        </>
    );
}
