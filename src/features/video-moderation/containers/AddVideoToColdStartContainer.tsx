import React, { useState } from "react";
import { Button, Divider, Form, FormInstance, InputNumber, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useDispatch } from "react-redux";

import { ScrollableModal, useCurrentStage } from "shared";
import { SearchForVideoModalContainer } from "./SearchForVideoModalContainer";
import { VideoCard } from "../components/VideoCard";
import { Video } from "../services";
import { patchVideoCommandAction } from "../store";

export interface AddVideoToColdStartFormData {
    video: Video;
    startListItem: number;
}

export interface AddVideoToColdStartContainerProps {
    initialValues?: Partial<AddVideoToColdStartFormData>;
    button: React.ReactNode;
    disableVideoChange?: boolean;
}

export function AddVideoToColdStartContainer({
    initialValues,
    button,
    disableVideoChange
}: AddVideoToColdStartContainerProps) {
    const dispatch = useDispatch();
    const stage = useCurrentStage();
    const [form] = useForm<AddVideoToColdStartFormData>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const destroyModal = () => setIsModalOpen(false);
    const showModal = () => setIsModalOpen(true);

    const handleOnFinish = async () => {
        const data = await form.validateFields();
        dispatch(
            patchVideoCommandAction({ stage, videoId: data.video.id, data: { startListItem: data.startListItem } })
        );
        destroyModal();
    };

    return (
        <>
            <div onClick={showModal}>{button}</div>

            <ScrollableModal
                title="Add video to the Cold Start list"
                width={500}
                open={isModalOpen}
                destroyOnClose
                footer={[
                    <Button key="cancel" onClick={destroyModal}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOnFinish}>
                        Submit
                    </Button>
                ]}
                onCancel={destroyModal}
                maskClosable={false}>
                <Form form={form} layout="horizontal" initialValues={initialValues}>
                    <Form.Item shouldUpdate>
                        {({ getFieldValue, setFieldValue }: FormInstance<AddVideoToColdStartFormData>) => {
                            const video: Video | undefined = getFieldValue("video");

                            return (
                                <>
                                    <Form.Item name="video" noStyle>
                                        <div></div>
                                    </Form.Item>
                                    Video:
                                    {video && (
                                        <div style={{ width: "120px" }}>
                                            <VideoCard value={video} stage={stage} />
                                        </div>
                                    )}
                                    &nbsp;
                                    {!disableVideoChange && (
                                        <SearchForVideoModalContainer
                                            stage={stage}
                                            btnText={video ? "Change" : "Select"}
                                            onVideoClick={(video) => setFieldValue("video", video)}
                                        />
                                    )}
                                    {video && !disableVideoChange && (
                                        <>
                                            <Divider type="vertical" />
                                            <Typography.Link onClick={() => setFieldValue("video", null)} type="danger">
                                                Remove
                                            </Typography.Link>
                                        </>
                                    )}
                                </>
                            );
                        }}
                    </Form.Item>
                    <Form.Item name="startListItem" label="Position" required>
                        <InputNumber min={1} />
                    </Form.Item>
                </Form>
            </ScrollableModal>
        </>
    );
}
