import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { App, Button, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { FileExtensions } from "config";
import { ScrollableModal } from "shared/components/ScrollableModal";
import {
    UniverseAddThumbnailsForm,
    UniverseThumbnailsFormInitialValues
} from "../components/UniverseAddThumbnailsForm";
import { universeInfoByIdSelector } from "../store/reducer";
import { upsertSingleUniverseAction } from "../store/actions";

export interface UniverseThumbnailsModalContainerProps {
    stage: string;
    id: number;
}

export const UniverseThumbnailsModalContainer = ({ stage, id }: UniverseThumbnailsModalContainerProps) => {
    const dispatch = useDispatch();
    const info = useSelector(universeInfoByIdSelector(stage, id));
    const { message } = App.useApp();

    const [form] = Form.useForm<UniverseThumbnailsFormInitialValues>();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => setIsModalOpen(true);
    const hideModal = () => setIsModalOpen(false);

    const handleOnFinish = async () => {
        const { thumbnail_64, thumbnail_128, thumbnail_512 } = await form.validateFields();

        if (!thumbnail_64 || !thumbnail_128 || !thumbnail_512) {
            message.error("Please select all thumbnail images.");
            return;
        }

        if (info?.data)
            dispatch(
                upsertSingleUniverseAction({
                    stage,
                    data: {
                        item: info.data,
                        newImages: [
                            { file: 1, extension: FileExtensions.Png, resolution: "64x64", newFile: thumbnail_64 },
                            { file: 1, extension: FileExtensions.Png, resolution: "128x128", newFile: thumbnail_128 },
                            { file: 1, extension: FileExtensions.Png, resolution: "512x512", newFile: thumbnail_512 }
                        ]
                    }
                })
            );

        hideModal();
    };

    return (
        <>
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal}>
                Add Thumbnails
            </Button>

            <ScrollableModal
                title="Add Thumbnails"
                open={isModalOpen}
                destroyOnClose
                onCancel={hideModal}
                footer={[
                    <Button key="close" onClick={hideModal}>
                        Close
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOnFinish}>
                        Add
                    </Button>
                ]}>
                <UniverseAddThumbnailsForm stage={stage} form={form} withThumbnailSelect />
            </ScrollableModal>
        </>
    );
};
