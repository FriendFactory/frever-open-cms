import React from "react";
import { Button, Form, Input, Upload, Switch } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { FileExtensions } from "config";
import { CommonCreateAssetProps } from ".";
import { SelectWithExtraDataOptions } from "shared";

export function CreateSFXForm({
    stage,
    formId,
    files,
    multiUpload,
    assetFileExtensions,
    changeMultiUploadStatus,
    uploadOnChange,
    uploadOnRemove,
    onSubmit
}: CommonCreateAssetProps) {
    const uploadLabelText = `Select three thumbnails in valid resolution(128x128, 256x256, 512x512) in png format and ${
        multiUpload ? "songs" : "one song"
    } in mp3 format`;
    return (
        <Form id={formId} layout="vertical" onFinish={onSubmit}>
            <Form.Item label="Bulk upload">
                <Switch checked={multiUpload} onClick={changeMultiUploadStatus} />
            </Form.Item>

            {!multiUpload && (
                <Form.Item rules={[{ required: true, message: "This field is required" }]} name="name" label="SFX Name">
                    <Input name="name" />
                </Form.Item>
            )}

            <Form.Item
                rules={[{ required: true, message: "This field is required" }]}
                name="sfxCategoryId"
                label="SFX Category">
                <SelectWithExtraDataOptions name="SFXCategory" stage={stage} />
            </Form.Item>

            <Form.Item
                rules={[{ required: true, message: "This field is required" }]}
                name="readinessId"
                label="Readiness">
                <SelectWithExtraDataOptions name="Readiness" stage={stage} />
            </Form.Item>

            <Form.Item label={uploadLabelText}>
                <Upload
                    multiple
                    accept={`.${FileExtensions[assetFileExtensions.thumbnail]}, .${
                        FileExtensions[assetFileExtensions.mainFile]
                    }`}
                    fileList={files}
                    customRequest={({ file }) => uploadOnChange(file)}
                    onRemove={uploadOnRemove}>
                    <Button icon={<UploadOutlined />}>Select Files</Button>
                </Upload>
            </Form.Item>
        </Form>
    );
}
