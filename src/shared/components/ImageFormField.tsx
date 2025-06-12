import React, { useState } from "react";
import { App, Button, Form, UploadFile } from "antd";
import Upload, { UploadChangeParam } from "antd/lib/upload";

import { FileType, ImageResolution, validateImage, validateImageExtension } from "shared";

export interface ImageFormFieldProps {
    pathname: string;
    requiredResolution?: ImageResolution;
    requiredExtensions?: FileType[];
    btnText?: string;
}

export const ImageFormField = ({ pathname, requiredResolution, requiredExtensions, btnText }: ImageFormFieldProps) => (
    <Form.Item shouldUpdate>
        {({ setFieldValue }) => {
            const handleOnChange = (file: UploadFile) => setFieldValue(pathname, file);
            return (
                <>
                    <Form.Item name={pathname} noStyle>
                        <div></div>
                    </Form.Item>
                    <UploadImageContainer
                        btnText={btnText}
                        onChange={handleOnChange}
                        requiredExtensions={requiredExtensions}
                        requiredResolution={requiredResolution}
                    />
                </>
            );
        }}
    </Form.Item>
);

interface UploadImageContainerProps {
    onChange: (file: UploadFile) => void;
    requiredResolution?: ImageResolution;
    requiredExtensions?: FileType[];
    btnText?: string;
}

const UploadImageContainer = ({
    onChange,
    requiredResolution,
    requiredExtensions,
    btnText
}: UploadImageContainerProps) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { message } = App.useApp();

    const handleOnChange = async ({ file, fileList }: UploadChangeParam<UploadFile>) => {
        if (!fileList.length) {
            setFileList([]);
            return;
        }

        const isImageValid = requiredResolution ? await validateImage(file as any, requiredResolution) : true;
        const isValidExtension = requiredExtensions ? validateImageExtension(file as any, requiredExtensions) : true;

        if (!isValidExtension) {
            message.error(`File extension is not valid. Supported file types: ${requiredExtensions?.join(",") ?? ""}`);
            return;
        }
        if (!isImageValid) {
            message.error(`Please select an image in valid resolution ${requiredResolution?.join("x") ?? ""}`);
            return;
        }

        setFileList(fileList);
        onChange(file);
    };

    return (
        <Upload
            accept={requiredExtensions?.join(",")}
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleOnChange}
            maxCount={1}
            listType="picture">
            <Button type="dashed">{btnText ?? "Upload thumbnail"}</Button>
        </Upload>
    );
};
