import React, { useState } from "react";
import { Button, Form } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { inAppProductPostAction } from "features/banking-moderation/store/actions";
import { InAppProduct } from "../services";
import { ScrollableModal } from "shared/components/ScrollableModal";
import {
    InAppProductForm,
    InAppProductFormInitialValues
} from "features/banking-moderation/components/InAppProductForm";
import { InAppProductDetailsFile } from "./InAppProductInfo/SpecialOfferListContainer";

export interface CreateProductModalContainerProps {
    stage: string;
}

export const CreateProductModalContainer = ({ stage }: CreateProductModalContainerProps) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm<InAppProductFormInitialValues>();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => setIsModalOpen(true);
    const hideModal = () => setIsModalOpen(false);

    const handleOnFinish = async () => {
        const { thumbnail_256, thumbnail_1024, publicationDate, depublicationDate, ...formData } =
            await form.validateFields();

        const data: Partial<InAppProduct> = {
            ...formData,
            publicationDate: publicationDate ? dayjs.utc(publicationDate).format() : null,
            depublicationDate: depublicationDate ? dayjs.utc(depublicationDate).format() : null
        };

        let thumbnails: InAppProductDetailsFile[] = [];

        if (thumbnail_256 && thumbnail_1024) {
            thumbnails = [
                { file: thumbnail_256, resolution: "256x256" },
                { file: thumbnail_1024, resolution: "1024x1024" }
            ];
        }

        dispatch(
            inAppProductPostAction({
                stage,
                data,
                thumbnails
            })
        );
        hideModal();
    };

    return (
        <>
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal} />

            <ScrollableModal
                title="Create new In-App Product"
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
                <InAppProductForm stage={stage} form={form} withThumbnailSelect />
            </ScrollableModal>
        </>
    );
};
