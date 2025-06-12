import React from "react";
import { Card, Form, Switch } from "antd";

import { UnionEditorSettingsCardProps } from ".";
import { AssetListFieldContainer } from "features/categories-moderation/containers/EditorSettings/AssetListFieldContainer";

interface VoiceFilterCard extends UnionEditorSettingsCardProps {
    stage: string;
}

export function VoiceFilterCard({ editorType, stage }: VoiceFilterCard) {
    return (
        <Card title="Voice Filter">
            {/* This component needs to initialize a nested "voiceFilterSettings" object in a resulting object. */}
            <Form.Item name={[editorType, "voiceFilterSettings"]} noStyle>
                <div></div>
            </Form.Item>
            <Form.Item name={[editorType, "voiceFilterSettings", "ids"]} noStyle rules={[{ required: false }]}>
                <div></div>
            </Form.Item>

            <Form.Item
                name={[editorType, "voiceFilterSettings", "allowEditing"]}
                label="AllowEditing"
                valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item
                name={[editorType, "voiceFilterSettings", "allowDisablingVoiceFilter"]}
                label="Allow Disabling Voice Filter"
                valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item shouldUpdate noStyle>
                {({ getFieldValue, setFieldValue, validateFields }) => {
                    const namePath = [editorType, "voiceFilterSettings", "ids"];

                    return (
                        <AssetListFieldContainer
                            stage={stage}
                            assetType="VoiceFilter"
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
