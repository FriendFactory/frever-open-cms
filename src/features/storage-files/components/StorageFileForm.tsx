import React from "react";
import { Form, FormProps, Input } from "antd";

import { StorageFile } from "../services";
import { ImageSelect } from "./ImageSelect";

export type StorageFileFormValues = Partial<StorageFile> & { file?: File };

export interface StorageFileFormProps extends FormProps {
    initialValues?: StorageFileFormValues;
}

export const StorageFileForm = (formProps: StorageFileFormProps) => {
    return (
        <Form layout="vertical" {...formProps}>
            <Form.Item label="Key" name="key">
                <Input />
            </Form.Item>

            <Form.Item label="Image" shouldUpdate>
                {({ setFieldValue, getFieldValue, validateFields }) => {
                    const fileValue = getFieldValue("file");
                    const handleOnChange = (value: File) => {
                        setFieldValue("file", value);
                        validateFields();
                    };

                    return (
                        <>
                            <Form.Item name="file" noStyle>
                                <div></div>
                            </Form.Item>
                            <ImageSelect value={fileValue} onChange={handleOnChange} />
                        </>
                    );
                }}
            </Form.Item>
        </Form>
    );
};
