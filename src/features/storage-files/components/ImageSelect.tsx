import React from "react";
import { Button, message, Upload } from "antd";

import { ThumbnailCard } from "shared/components/ThumbnailCard";
import { createAcceptAttribute } from "config";

export interface ImageSelectProps {
    value?: File;
    onChange: (value: File) => void;
}

export function ImageSelect({ value, onChange }: ImageSelectProps) {
    const handleOnChange = async ({ file }: any) => {
        if (file.type !== "image/png") {
            message.error("File extension is not valid");
            return;
        }

        onChange(file);
    };

    return value ? (
        <ThumbnailCard
            accept={"image/png"}
            width={400}
            imageUrl={URL.createObjectURL(value)}
            handleUpdate={handleOnChange}
        />
    ) : (
        <Upload accept={createAcceptAttribute("png")} showUploadList={false} customRequest={handleOnChange}>
            <Button type="primary" ghost>
                Select
            </Button>
        </Upload>
    );
}
