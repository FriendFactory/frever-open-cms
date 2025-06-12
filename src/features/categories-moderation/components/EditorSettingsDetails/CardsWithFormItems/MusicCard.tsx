import React from "react";
import { Card, Form, Row, Col, Switch } from "antd";

import { UnionEditorSettingsCardProps } from ".";
import { AssetListFieldContainer } from "features/categories-moderation/containers/EditorSettings/AssetListFieldContainer";

interface MusicCardProps extends UnionEditorSettingsCardProps {
    stage: string;
}

export function MusicCard({ editorType, stage }: MusicCardProps) {
    return (
        <Card title="Music">
            {/* This component needs to initialize a nested "musicSettings" object in a resulting object. */}
            <Form.Item name={[editorType, "musicSettings"]} noStyle>
                <div></div>
            </Form.Item>
            <Form.Item
                name={[editorType, "musicSettings", "externalSongSettings", "ids"]}
                noStyle
                rules={[{ required: false }]}>
                <div></div>
            </Form.Item>

            <Form.Item
                name={[editorType, "musicSettings", "allowEditing"]}
                label="Allow Editing"
                valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item
                name={[editorType, "musicSettings", "userSoundSettings", "allowUserSounds"]}
                label="Allow User Sounds"
                valuePropName="checked">
                <Switch />
            </Form.Item>

            <Row gutter={[, 24]}>
                <Col span={24}>
                    <Form.Item shouldUpdate noStyle>
                        {({ getFieldValue, setFieldValue, validateFields }) => {
                            const namePath = [editorType, "musicSettings", "externalSongSettings", "ids"];
                            return (
                                <AssetListFieldContainer
                                    stage={stage}
                                    assetType="ExternalSong"
                                    value={getFieldValue(namePath)}
                                    onChangeFieldValue={(values: number[]) => {
                                        validateFields([namePath]);
                                        setFieldValue(namePath, values);
                                    }}
                                />
                            );
                        }}
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
}
