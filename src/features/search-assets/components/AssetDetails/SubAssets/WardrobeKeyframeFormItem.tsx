import React from "react";
import { App, Button, Divider, Form, Select, Upload, SelectProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { isEqualWithPrecision, validateKeyframeJSON } from "features/search-assets/helpers";
import { hairPhysicsTemplateCurves } from "features/search-assets/constants";
import { Keyframe } from "features/search-assets/services";
import { WardrobeKeyframePreview } from "./WardrobeKeyframePreview";

type SelectVelues = keyof typeof hairPhysicsTemplateCurves | "Custom";

interface KeyframeFormItemProps {
    label: string;
    fieldName: string;
}

export const KeyframeFormItem = ({ label, fieldName }: KeyframeFormItemProps) => {
    const { message } = App.useApp();
    const form = Form.useFormInstance();

    const fieldSelect = `${fieldName}Select`;
    const keyframes = form.getFieldValue(fieldName);

    const defaultValue = keyframes
        ? Object.keys(hairPhysicsTemplateCurves).find((key) =>
              isEqualWithPrecision(
                  JSON.parse(hairPhysicsTemplateCurves[key as keyof typeof hairPhysicsTemplateCurves]),
                  keyframes
              )
          ) || "Custom"
        : null;

    const handleUploadFile = (file: File) => {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && e.target.result) {
                try {
                    const importedData = JSON.parse(e.target.result as string);
                    if (validateKeyframeJSON(importedData)) {
                        form?.setFieldValue(fieldName, importedData);
                        form?.setFieldValue(fieldSelect, "Custom");
                        form?.validateFields();
                        message.success("File read successfully!");
                    } else {
                        message.error("Invalid file structure.");
                    }
                } catch (error) {
                    message.error("Error reading file.");
                }
            }
        };

        reader.readAsText(file);
        return false;
    };

    const onHandleChange: SelectProps["onChange"] = (option: SelectVelues) => {
        if (option === "Custom") return;

        const getStringJSON = hairPhysicsTemplateCurves[option];
        const value = getStringJSON ? JSON.parse(getStringJSON) : null;

        form?.setFieldValue(fieldName, value);
        form?.validateFields();
    };
    return (
        <Form.Item shouldUpdate noStyle>
            {({ getFieldValue }) => {
                const fieldKeyframes: Keyframe | null = getFieldValue(fieldName);

                return (
                    <>
                        <Form.Item noStyle name={fieldName} rules={[{ required: false }]}>
                            <div></div>
                        </Form.Item>
                        <Form.Item
                            label={
                                <span>
                                    {label} {fieldKeyframes && <WardrobeKeyframePreview keyframes={fieldKeyframes} />}
                                </span>
                            }
                            name={fieldSelect}
                            rules={[{ required: false }]}
                            initialValue={defaultValue}>
                            <Select
                                onChange={onHandleChange}
                                style={{ width: "100%" }}
                                allowClear
                                options={Object.keys(hairPhysicsTemplateCurves).map((key) => ({
                                    label: key,
                                    value: key
                                }))}
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Divider style={{ margin: "8px 0" }} />
                                        <Upload
                                            accept="application/json"
                                            beforeUpload={handleUploadFile}
                                            showUploadList={false}
                                            maxCount={1}>
                                            <Button icon={<UploadOutlined />}>Import Settings</Button>
                                        </Upload>
                                    </>
                                )}
                            />
                        </Form.Item>
                    </>
                );
            }}
        </Form.Item>
    );
};
