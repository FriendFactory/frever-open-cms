import React from "react";
import { Button, Form, Input, Upload, Switch } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { FileExtensions } from "config";
import { CommonCreateAssetProps } from ".";
import { CustomSelectRender } from "./AssetDetails/CustomSelectRender";
import { CATEGORY_LIST_URL } from "urls";
import { ProtectedLink, SelectMarketingCountries, SelectWithExtraDataOptions } from "shared";
import { InlineCreateCategoryContainer } from "features/categories-moderation/containers/InlineCreateCategoryContainer";

export function CreateSongForm({
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
                <Form.Item
                    rules={[{ required: true, message: "This field is required" }]}
                    name="name"
                    label="Song Name">
                    <Input name="name" />
                </Form.Item>
            )}

            <Form.Item
                rules={[{ required: true, message: "This field is required" }]}
                name="genreId"
                label={
                    <ProtectedLink feature="CategoriesFull" to={CATEGORY_LIST_URL.format({ stage, category: "Genre" })}>
                        Genre
                    </ProtectedLink>
                }>
                <SelectWithExtraDataOptions
                    name="Genre"
                    stage={stage}
                    dropdownRender={(menu) => (
                        <CustomSelectRender
                            menu={menu}
                            createFragment={<InlineCreateCategoryContainer category="Genre" />}
                        />
                    )}
                />
            </Form.Item>

            <Form.Item
                rules={[{ required: true, message: "This field is required" }]}
                name="artistId"
                label={
                    <ProtectedLink
                        feature="CategoriesFull"
                        to={CATEGORY_LIST_URL.format({ stage, category: "Artist" })}>
                        Artist
                    </ProtectedLink>
                }>
                <SelectWithExtraDataOptions
                    name="Artist"
                    stage={stage}
                    dropdownRender={(menu) => (
                        <CustomSelectRender
                            menu={menu}
                            createFragment={<InlineCreateCategoryContainer category="Artist" />}
                        />
                    )}
                />
            </Form.Item>

            <Form.Item rules={[{ required: true, message: "This field is required" }]} name="labelId" label="Label">
                <SelectWithExtraDataOptions name="Label" stage={stage} />
            </Form.Item>

            <Form.Item rules={[{ required: true, message: "This field is required" }]} name="moodId" label="Mood">
                <SelectWithExtraDataOptions name="Mood" stage={stage} />
            </Form.Item>

            <Form.Item
                rules={[{ required: true, message: "This field is required" }]}
                name="readinessId"
                label="Readiness">
                <SelectWithExtraDataOptions name="Readiness" stage={stage} />
            </Form.Item>

            <Form.Item name="availableForCountries" label="Marketing countries/areas">
                <SelectMarketingCountries />
            </Form.Item>

            {!multiUpload && (
                <Form.Item name="externalPartnerId" label="External Partner">
                    <Input name="externalPartnerId" />
                </Form.Item>
            )}

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
