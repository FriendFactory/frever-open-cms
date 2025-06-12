import React from "react";
import { Button, message, Upload } from "antd";

import { ThumbnailCard } from "shared/components/ThumbnailCard";
import { validatePromotedSongImage } from "../helpers";

export interface ImageSelectProps {
    value?: File;
    onChange: (value: File) => void;
}

export function ImageSelect({ value, onChange }: ImageSelectProps) {
    const handleOnUpdateImage = async (file: File) => {
        const validationResult = await validatePromotedSongImage(file);

        validationResult.ok ? onChange(file) : message.error(validationResult.error);
    };

    return value ? (
        <ThumbnailCard
            height="auto"
            width="100%"
            imageUrl={URL.createObjectURL(value)}
            handleUpdate={handleOnUpdateImage}
        />
    ) : (
        <Upload showUploadList={false} customRequest={({ file }: any) => handleOnUpdateImage(file)}>
            <Button type="primary" ghost>
                Select
            </Button>
        </Upload>
    );
}
