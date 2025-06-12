import React from "react";
import { Card, Form, Switch } from "antd";

import { AssetListFieldContainer } from "features/categories-moderation/containers/EditorSettings/AssetListFieldContainer";
import { UnionEditorSettingsCardProps } from ".";

interface CameraAnimationCard extends UnionEditorSettingsCardProps {
    stage: string;
}

export function CameraAnimationCard({ stage, editorType }: CameraAnimationCard) {
    return (
        <Card title="Camera Animation">
            {/* This component needs to initialize a nested "cameraAnimationSettings" object in a resulting object. */}
            <Form.Item name={[editorType, "cameraAnimationSettings"]} noStyle>
                <div></div>
            </Form.Item>
            <Form.Item
                name={[editorType, "cameraAnimationSettings", "templateIds"]}
                noStyle
                rules={[{ required: false }]}>
                <div></div>
            </Form.Item>

            <Form.Item
                name={[editorType, "cameraAnimationSettings", "allowEditing"]}
                label="Allow Editing"
                valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item
                name={[editorType, "cameraAnimationSettings", "allTemplatesAvailable"]}
                label="All Templates Available"
                valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item shouldUpdate noStyle>
                {({ getFieldValue, setFieldValue, validateFields }) => {
                    const namePath = [editorType, "cameraAnimationSettings", "templateIds"];
                    return (
                        <AssetListFieldContainer
                            stage={stage}
                            assetType="CameraAnimationTemplate"
                            value={getFieldValue(namePath)}
                            onChangeFieldValue={(values: number[]) => {
                                setFieldValue(namePath, values);
                                validateFields([namePath]);
                            }}
                        />
                    );
                }}
            </Form.Item>
        </Card>
    );
}
