import React, { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { Button, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { FileExtensions } from "config";
import { ScrollableModal, UploadImage, useCurrentStage } from "shared";
import { ThemeCollection, WardrobeShortInfo } from "../services";
import { ThemeCollectionWithImages, upsertSingleCollectionAction } from "../store/actions";
import { ThemeCollectionInfoForm } from "../components/ThemeCollectionInfoForm";
import { WardrobeSearchContainer } from "./WardrobeSearchContainer";
import { ThemeCollectionWardrobes } from "../components/ThemeCollectionWardrobes";
import { seasonListPageSelector } from "features/seasons-moderation";

const images = [
    { key: "128x128" as const, name: "small" },
    { key: "512x512" as const, name: "large" }
];

type ImageFormCommand =
    | { type: "add"; data: WardrobeShortInfo[] }
    | { type: "replace"; data: WardrobeShortInfo[] }
    | { type: "remove"; ids: number[] };

const createImageFormPath = (imgKey: string) => ["images", imgKey];

type ThumbnailImageToUpload = NonNullable<ThemeCollectionWithImages["newImages"]>[number];

export type CreateThemeCollectionFormProps = Partial<ThemeCollection> & {
    images: { [key in typeof images[number]["key"]]: ThumbnailImageToUpload };
};

export function CreateThemeCollectionContainer() {
    const stage = useCurrentStage();
    const dispatch = useDispatch();
    const seasonList = useSelector(seasonListPageSelector(stage, {}));

    const [form] = useForm<CreateThemeCollectionFormProps>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = () => setIsModalOpen(true);

    const discard = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleOnFinish = async () => {
        const { images, ...item } = await form.validateFields();

        const newImages = Object.values(images).filter(Boolean);

        dispatch(upsertSingleCollectionAction({ stage, data: { item, newImages } }));

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
                    file: 1,
                    extension: FileExtensions.Png
                }
            }
        ]);
    };

    const handlOnFailImage = (name: "128x128" | "512x512") => (error: string) =>
        form.setFields([{ name: createImageFormPath(name), errors: [error] }]);

    return (
        <>
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal}>
                Create
            </Button>

            <ScrollableModal
                title="Create new theme collection"
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
                            rules={[{ required: true, message: "Please select thumbnail" }]}>
                            <UploadImage
                                onUpload={handleOnUploadImage(el.key)}
                                onRemove={() => form.resetFields(createImageFormPath(el.key))}
                                validation={{
                                    accept: ["image/png"],
                                    onFail: handlOnFailImage(el.key)
                                }}>
                                <Button type="dashed">Select {el.name} thumbnail</Button>
                            </UploadImage>
                        </Form.Item>
                    ))}

                    <Form.Item shouldUpdate>
                        {({ getFieldValue, setFields }) => {
                            const wardrobes: WardrobeShortInfo[] = getFieldValue("wardrobes") || [];

                            const wardrobeCommands = (command: ImageFormCommand) => {
                                let value;

                                if (command.type === "add") value = [...wardrobes, ...command.data];
                                if (command.type === "replace") value = [...command.data];
                                if (command.type === "remove")
                                    value = wardrobes.filter((el) => !command.ids.some((id) => el.id === id));

                                setFields([
                                    {
                                        name: "wardrobes",
                                        errors: undefined,
                                        value
                                    }
                                ]);
                            };

                            const isLinked = (id: number) => !!wardrobes.find((el: WardrobeShortInfo) => el.id === id);

                            return (
                                <>
                                    <Form.Item
                                        label="Wardrobes"
                                        name="wardrobes"
                                        rules={[{ required: true, message: "Please select at least one wardrobe" }]}>
                                        <ThemeCollectionWardrobes
                                            stage={stage}
                                            wardrobes={wardrobes}
                                            onUpdate={(data) => wardrobeCommands({ type: "replace", data })}
                                            onDelete={(id) => wardrobeCommands({ type: "remove", ids: [id] })}
                                        />
                                    </Form.Item>
                                    <WardrobeSearchContainer
                                        isLinked={isLinked}
                                        bulkUpdate={(type, data) =>
                                            wardrobeCommands(
                                                type === "add" ? { type, data } : { type, ids: data.map((el) => el.id) }
                                            )
                                        }
                                        changeStatusOfLinking={(item) =>
                                            wardrobeCommands(
                                                isLinked(item.id)
                                                    ? { type: "remove", ids: [item.id] }
                                                    : { type: "add", data: [item] }
                                            )
                                        }
                                    />
                                </>
                            );
                        }}
                    </Form.Item>
                </Form>

                <ThemeCollectionInfoForm form={form} seasonList={seasonList} />
            </ScrollableModal>
        </>
    );
}
