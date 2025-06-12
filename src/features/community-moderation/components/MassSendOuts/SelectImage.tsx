import React from "react";
import { App, Form } from "antd";

import { UploadImageV2, useCurrentStage } from "shared";

export interface SelectImageProps {
    id?: number;
}

export function SelectImage({ id }: SelectImageProps) {
    const stage = useCurrentStage();
    const { message } = App.useApp();
    return (
        <Form.Item label="Image" shouldUpdate>
            {({ getFieldValue, setFieldValue, validateFields }) => {
                const files = getFieldValue("image");

                const isFiles = Array.isArray(files);
                return (
                    <UploadImageV2
                        stage={stage}
                        onUpload={(file) => {
                            validateFields(["image"]);
                            setFieldValue("image", file);
                        }}
                        mainFileInfo={isFiles && id ? { files, entityName: "ScheduledMessage", id } : undefined}
                        onRemove={() => {
                            validateFields(["image"]);
                            setFieldValue("image", null);
                        }}
                        validation={{
                            accept: ["image/jpeg"],
                            onFail: (errorMessage) => message.error(errorMessage)
                        }}
                    />
                );
            }}
        </Form.Item>
    );
}
