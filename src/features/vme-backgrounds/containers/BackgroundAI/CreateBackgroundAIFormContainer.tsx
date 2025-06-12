import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { Button, Divider, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { FileType, ScrollableModal, UploadImage, useCurrentStage } from "shared";
import { VMEBackgroundInfoForm } from "features/vme-backgrounds/components/VMEBackgroundInfoForm";
import {
    BackgroundAIOptionsForm,
    BackgroundAIGenerationForm,
    BackgroundAIPropmtsForm
} from "features/vme-backgrounds/components/BackgroundAI";
import {
    BackgroundAIWithImages,
    upsertSingleBackgroundAIAction
} from "features/vme-backgrounds/store/actions/BackgroundAI";
import { BackgroundAI } from "features/vme-backgrounds/services";
import { FileExtensions } from "config";

const inititalValuesGenerationForm = { settings: { loraScale: 0.6, guidanceScale: 7.5, diffusionSteps: 30 } };
const inititalValuesPromtsForm = { settings: { prompts: [{ weight: 0, text: "" }] } };
const inititalValuesOptionsForm = { settings: { sets: [{ options: [{ displayValue: "", promptValue: "" }] }] } };

type Image = {
    key: string;
    name: string;
    accept: FileType[];
};

const images: Image[] = [
    { key: "128x128", name: "small", accept: ["image/jpeg"] },
    { key: "1024x2340", name: "large", accept: ["image/png"] }
];

const createImageFormPath = (imgKey: string) => ["images", imgKey];

type ThumbnailImageToUpload = NonNullable<BackgroundAIWithImages["newImages"]>[number];

export type CreateBackgroundAIFormProps = Partial<BackgroundAI> & {
    images: { [key in typeof images[number]["key"]]: ThumbnailImageToUpload };
};

export function CreateBackgroundAIFormContainer() {
    const stage = useCurrentStage();
    const dispatch = useDispatch();
    const [form] = useForm<CreateBackgroundAIFormProps>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = () => setIsModalOpen(true);

    const discard = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleOnFinish = async () => {
        const { images, ...item } = await form.validateFields();

        const newImages = Object.values(images).filter(Boolean);

        dispatch(upsertSingleBackgroundAIAction({ stage, data: { item, newImages } }));

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
                    extension: file.type === "image/jpeg" ? FileExtensions.Jpg : FileExtensions.Png
                }
            }
        ]);
    };

    const handlOnFailImage = (name: string) => (error: string) =>
        form.setFields([{ name: createImageFormPath(name), errors: [error] }]);

    return (
        <>
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal}>
                Create
            </Button>

            <ScrollableModal
                width={992}
                title="Create AI Background"
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
                                    accept: el.accept,
                                    onFail: handlOnFailImage(el.key)
                                }}>
                                <Button type="dashed">Select {el.name} image</Button>
                            </UploadImage>
                        </Form.Item>
                    ))}
                </Form>
                <VMEBackgroundInfoForm form={form} />

                <Divider orientation="left">Settings</Divider>
                <BackgroundAIGenerationForm form={form} initialValues={inititalValuesGenerationForm} />

                <BackgroundAIPropmtsForm form={form} initialValues={inititalValuesPromtsForm} />
                <br />
                <BackgroundAIOptionsForm form={form} initialValues={inititalValuesOptionsForm} />
            </ScrollableModal>
        </>
    );
}
