import React from "react";
import { Card, Form, Switch } from "antd";

import { UnionEditorSettingsCardProps } from ".";
import { SelectWithExtraDataOptions } from "shared";

interface CameraFilterCardProps extends UnionEditorSettingsCardProps {
    stage: string;
}

export function CameraFilterCard({ editorType, stage }: CameraFilterCardProps) {
    return (
        <Card title="Camera Filter">
            <Form.Item
                name={[editorType, "cameraFilterSettings", "allowEditing"]}
                label="Allow Editing"
                valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item name={[editorType, "cameraFilterSettings", "categories"]} label="Categories">
                <SelectWithExtraDataOptions stage={stage} name="CameraFilterCategory" mode="multiple" />
            </Form.Item>
        </Card>
    );
}
