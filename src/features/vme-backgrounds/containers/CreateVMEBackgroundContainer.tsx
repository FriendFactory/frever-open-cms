import React, { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { Button, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { FileExtensions } from "config";
import { ScrollableModal, UploadImage, useCurrentStage } from "shared";
import { VMEBackground } from "../services";

import { VMEBackgroundInfoForm } from "../components/VMEBackgroundInfoForm";
import { upsertSingleVMEBackgroundAction, VMEBackgroundWithImages } from "../store/actions";

const images = [
    { key: "128x128" as const, name: "small" },
    { key: "1024x2340" as const, name: "large" }
];

const createImageFormPath = (imgKey: string) => ["images", imgKey];

type ThumbnailImageToUpload = NonNullable<VMEBackgroundWithImages["newImages"]>[number];

export type CreateVMEBackgroundFormProps = Partial<VMEBackground> & {
    images: { [key in (typeof images)[number]["key"]]: ThumbnailImageToUpload };
};

export function CreateVMEBackgroundContainer() {
    const stage = useCurrentStage();
    const dispatch = useDispatch();

    const [form] = useForm<CreateVMEBackgroundFormProps>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = () => setIsModalOpen(true);

    const discard = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleOnFinish = async () => {
        const { images, ...item } = await form.validateFields();

        const newImages = Object.values(images).filter(Boolean);

        dispatch(upsertSingleVMEBackgroundAction({ stage, data: { item, newImages } }));

        setIsModalOpen(false);
    };

    const handleOnUploadImage = (resolution: string) => async (file: File) => {
        form.setFields([
            {
                name: createImageFormPath(resolution),
                errors: undefined,
                value: {
                    newFile: file,
                    resolution,
                    file: 0,
                    extension: FileExtensions.Jpg
                }
            }
        ]);
    };

    const handlOnFailImage = (name: "128x128" | "1024x2340") => (error: string) =>
        form.setFields([{ name: createImageFormPath(name), errors: [error] }]);

    return (
        <>
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal}>
                Create
            </Button>

            <ScrollableModal
                title="Create VME Background"
                open={isModalOpen}
                onOk={handleOnFinish}
                onCancel={discard}
                destroyOnClose>
                <Form form={form} layout="vertical">
                    {images.map((el) => (
                        <Form.Item
                            name={createImageFormPath(el.key)}
                            required
                            key={el.key}
                            rules={[{ required: true, message: "Please select image" }]}>
                            <UploadImage
                                onUpload={handleOnUploadImage(el.key)}
                                onRemove={() => form.resetFields(createImageFormPath(el.key))}
                                validation={{
                                    accept: ["image/jpeg"],
                                    onFail: handlOnFailImage(el.key)
                                }}>
                                <Button type="dashed">Select {el.name} image</Button>
                            </UploadImage>
                        </Form.Item>
                    ))}
                </Form>

                <VMEBackgroundInfoForm form={form} />
            </ScrollableModal>
        </>
    );
}
