import React, { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { Button, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { FileExtensions } from "config";
import { ScrollableModal, UploadImage, useCurrentStage } from "shared";
import { upsertSingleWatermarkAction } from "../store/actions";
import { WatermarkInfoForm } from "../components/WatermarkInfoForm";
import { WatermarkTag } from "../services";

const UPLOAD_FILES: WatermarkTag[] = ["LANDSCAPE", "PORTRAIT"];

export function CreateWatermarkContainer() {
    const stage = useCurrentStage();
    const dispatch = useDispatch();

    const [form] = useForm();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = () => setIsModalOpen(true);

    const discard = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleOnFinish = async () => {
        const { imagePORTRAIT, imageLANDSCAPE, ...item } = await form.validateFields();

        dispatch(upsertSingleWatermarkAction({ stage, data: { item, newImages: [imagePORTRAIT, imageLANDSCAPE] } }));

        setIsModalOpen(false);
    };

    const handleOnUploadImage = (fileName: string) => async (file: File) => {
        form.setFields([
            {
                name: `image${fileName}`,
                errors: undefined,
                value: {
                    newFile: file,
                    resolution: null,
                    file: 0,
                    extension: FileExtensions.Png,
                    tags: [fileName]
                }
            }
        ]);
    };

    const handlOnFailImage = (fileName: string) => (error: string) =>
        form.setFields([{ name: `image${fileName}`, errors: [error] }]);

    return (
        <>
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal} />

            <ScrollableModal
                title="Create Watermark"
                open={isModalOpen}
                onOk={handleOnFinish}
                onCancel={discard}
                destroyOnClose>
                <Form form={form} layout="vertical">
                    {UPLOAD_FILES.map((fileName) => (
                        <Form.Item
                            key={fileName}
                            name={`image${fileName}`}
                            required
                            rules={[{ required: true, message: "Please select image" }]}>
                            <UploadImage
                                onUpload={handleOnUploadImage(fileName)}
                                onRemove={() => form.resetFields([`image${fileName}`])}
                                validation={{
                                    accept: ["image/png"],
                                    onFail: handlOnFailImage(fileName)
                                }}>
                                <Button type="dashed">{`${fileName} Image`}</Button>
                            </UploadImage>
                        </Form.Item>
                    ))}
                </Form>

                <WatermarkInfoForm form={form} />
            </ScrollableModal>
        </>
    );
}
