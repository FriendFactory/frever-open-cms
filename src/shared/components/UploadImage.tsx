import React, { useState } from "react";
import { Upload, UploadFile } from "antd";
import { UploadChangeParam } from "antd/lib/upload";

import { ImageResolution, validateImage } from "shared/img-helpers";

export type FileType = "image/png" | "image/jpeg" | "image/gif" | "image/svg+xml" | "image/webp";

interface UploadImageProps {
    children: React.ReactNode;
    onUpload: (file: File) => void;
    onRemove?: () => void;

    validation?: {
        resolution?: ImageResolution;
        accept?: FileType[];
        onFail: (error: string) => void;
    };
}

export function UploadImage({ children, onUpload, onRemove, validation }: UploadImageProps) {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleOnChange = async ({ file, fileList }: UploadChangeParam<UploadFile>) => {
        if (!fileList.length) {
            setFileList([]);
            return;
        }

        if (validation?.resolution) {
            const isImageValid = await validateImage(file as unknown as File, validation.resolution);

            if (!isImageValid) {
                validation.onFail(
                    `Incorrect Image Resolution. Image should be ${validation?.resolution.join("x")} pixels`
                );
                return;
            }
        }

        if (validation?.accept && !validation.accept.includes(file.type as FileType)) {
            validation.onFail(`Unsupported File Type. Supported file types: ${validation.accept.join(", ")}`);
            return;
        }

        setFileList(fileList);
        onUpload(file as unknown as File);
    };

    return (
        <Upload
            onRemove={onRemove}
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleOnChange}
            accept={validation?.accept?.join(", ")}
            maxCount={1}
            listType="picture">
            {children}
        </Upload>
    );
}
